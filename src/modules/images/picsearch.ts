import * as utils from "../_utils";
import { MessageEmbed, TextChannel } from "discord.js";
import { ArgumentRequirement, Module, ModuleActionArgument } from "@app/types/Module";
import { KonachanApiResponse } from "@app/types/KonachanApiResponse";
import { YandereApiResponse } from "@app/types/YandereApiResponse";
import { DanbooruApiResponse } from "@app/types/DanbooruApiResponse";
import { SankakuApiResponse } from "@app/types/SankakuApiResponse";

enum ApiPortal {
	kon = "https://konachan.com/post.json",
	yan = "https://yande.re/post.json",
	dan = "https://danbooru.donmai.us/posts.json",
	san = "https://capi-v2.sankakucomplex.com/posts/keyset"
};

type ImageObject = {
	id: string,
	rating: "s" | "q" | "e",
	source: string | null,
	file_url: string | null,
	created_at: Date,
	width: number,
	height: number;
};

export const fetchList = async (prov: keyof typeof ApiPortal, tags: string[] = [], nsfw = false): Promise<ImageObject[]> => {
	let res = await utils.req2json(`${ApiPortal[prov]}?tags=${tags.filter(tag => { return !tag.includes("rating") || nsfw; }).join('+')}${nsfw ? "" : "+rating:s"}&limit=20`);

	switch (prov) {
		case "kon": {
			const result = res as KonachanApiResponse;
			return result.map(a => {
				return {
					id: `${a.id}`,
					rating: a.rating,
					source: a.source,
					file_url: a.file_url,
					created_at: new Date(a.created_at * 1000),
					width: a.width,
					height: a.height
				};
			});
		}
		case "yan": {
			const result = res as YandereApiResponse;
			return result.map(a => {
				return {
					id: `${a.id}`,
					rating: a.rating,
					source: a.source,
					file_url: a.file_url,
					created_at: new Date(a.created_at * 1000),
					width: a.width,
					height: a.height
				};
			});
		}
		case "dan": {
			const result = res as DanbooruApiResponse;
			return result.map(a => {
				return {
					id: `${a.id}`,
					rating: a.rating,
					source: a.source,
					file_url: a.large_file_url ?? a.file_url ?? a.preview_file_url ?? null,
					created_at: new Date(a.created_at),
					width: a.image_width,
					height: a.image_height
				};
			});
		}
		case "san": {
			const result = res as SankakuApiResponse;
			return result.data.map(a => {
				return {
					id: `${a.id}`,
					rating: a.rating,
					source: a.source,
					file_url: a.file_url ?? a.sample_url ?? a.preview_url ?? null,
					created_at: new Date(a.created_at.s * 1000),
					width: a.width,
					height: a.height
				};
			});
		}
	}
};

export const genEmbed = async (prov: keyof typeof ApiPortal, imageObject: ImageObject, showImage = false, nsfw = false) => {
	const embed = new MessageEmbed()
		.setAuthor("搜尋結果", "https://cdn4.iconfinder.com/data/icons/alphabet-3/500/ABC_alphabet_letter_font_graphic_language_text_" + prov.substr(0, 1).toUpperCase() + "-64.png")
		.setColor(({
			s: 0x7df28b,
			q: 0xe4ea69,
			e: 0xd37a52
		})[imageObject.rating])
		.addField("ID", `[${imageObject.id}](${({
			kon: `https://konachan.com/post/show/${imageObject.id}`,
			yan: `https://yande.re/post/show/${imageObject.id}`,
			dan: `https://danbooru.donmai.us/posts/${imageObject.id}`,
			san: `https://sankaku.app/post/show/${imageObject.id}`
		})[prov]})`, true)
		.addField("Dimensions", `${imageObject.width} x ${imageObject.height}`, true)
		.addField("來源: ", (
			typeof imageObject.source === "string" && imageObject.source.length > 0 ?
				imageObject.source.replace(/https:\/\/i.pximg.net\/img-original\/img\/\d{4}\/(\d{2}\/){5}(\d+)_p\d+\..+/, "https://www.pixiv.net/artworks/$2") :
				"(未知)"
		))
		.setTimestamp(imageObject.created_at);

	if (showImage && (imageObject.rating != "s" || nsfw) && imageObject.file_url) {
		embed.setImage(imageObject.file_url);
	}
	return embed;
};

export const module: Module = {
	trigger: utils.enumStringKeys(ApiPortal),
	event: "messageCreate",
	argv: {
		"tags": [ArgumentRequirement.Optional, ArgumentRequirement.Concat]
	},
	action: async (obj: ModuleActionArgument) => {
		const provider = obj.trigger.substr(0, 3) as keyof typeof ApiPortal;
		const nsfw = (obj.message.channel as TextChannel).nsfw;

		const list = await fetchList(provider, (obj.argv!.tags ?? "").split(" "), nsfw);

		if (!list.length) {
			return await obj.message.reply("`找不到結果。請檢查關鍵字`");
		}

		const imageObject = utils.randomArrayElement(list);

		return await obj.message.reply({
			embeds: [await genEmbed(provider, imageObject, true, (obj.message.channel as TextChannel).nsfw)]
		});
	}
};