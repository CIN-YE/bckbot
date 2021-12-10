import { MessageButtonStyle, Snowflake } from "discord.js";
import { z } from "zod";

const ZEmoji = z.union([
	z.object({
		id: z.custom<Snowflake>()
	}),
	z.object({
		name: z.string()
	})
]);

const ZMessageComponentBaseButton = z.object({
	type: z.custom<"BUTTON">(),
	disabled: z.boolean().optional(),
	label: z.string().min(1).max(80),
	emoji: ZEmoji.optional()
});

const ZMessageComponentColoredButton = ZMessageComponentBaseButton.merge(z.object({
	custom_id: z.string().min(1).max(100),
	style: z.custom<Exclude<MessageButtonStyle, "LINK">>()
}));

const ZMessageComponentLinkButton = ZMessageComponentBaseButton.merge(z.object({
	style: z.custom<"LINK">(),
	url: z.string().url()
}));

const ZMessageComponentButton = z.union([ZMessageComponentColoredButton, ZMessageComponentLinkButton]);

const ZMessageComponentSelectMenuOption = z.object({
	label: z.string().min(1).max(100),
	value: z.string().min(1).max(100),
	description: z.string().min(1).max(100).optional(),
	emoji: ZEmoji.optional(),
	default: z.boolean().optional(),
});

const ZMessageComponentSelectMenu = z.object({
	type: z.custom<"SELECT_MENU">(),
	custom_id: z.string().max(100),
	disabled: z.boolean().optional(),
	options: ZMessageComponentSelectMenuOption.array().min(1).max(25),
	placeholder: z.string().max(100).optional(),
	min_values: z.number().min(0).max(25).optional(),
	max_values: z.number().min(2).max(25).optional()
});

const ZMessageComponents = z.union([
	ZMessageComponentButton.array().min(1).max(5), 
	ZMessageComponentSelectMenu.array().length(1)
]).array().min(1).max(5);

export type MessageComponentButton = z.infer<typeof ZMessageComponentButton>;
export type MessageComponents = z.infer<typeof ZMessageComponents>;