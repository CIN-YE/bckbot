// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

import { AnimeData } from "./saucenao/Anime";
import { ArtstationData } from "./saucenao/Artstation";
import { ResultData } from "./saucenao/Base";
import { HAnimeData } from "./saucenao/HAnime";
import { HGameData } from "./saucenao/HCG";
import { HMagazinesData } from "./saucenao/HMagazines";
import { MangadexData } from "./saucenao/Mangadex";
import { MoebooruData } from "./saucenao/MoebooruBase";
import { PawooData } from "./saucenao/Pawoo";
import { PixivData } from "./saucenao/Pixiv";
import { SeigaData } from "./saucenao/Seiga";

export interface SaucenaoApiResponse {
    header:  Header;
    results: Result[];
}

interface Header {
    user_id:             string;
    account_type:        string;
    short_limit:         string;
    long_limit:          string;
    long_remaining:      number;
    short_remaining:     number;
    status:              number;
    results_requested:   number;
    index:               { [key: string]: Index };
    search_depth:        string;
    minimum_similarity:  number;
    query_image_display: string;
    query_image:         string;
    results_returned:    number;
	message?:            string;
}

interface Index {
    status:    number;
    parent_id: number;
    id:        number;
    results:   number;
}

interface Result {
    header: ResultHeader;
    data:   PixivData | MoebooruData | PawooData | MangadexData | ArtstationData | HMagazinesData | HAnimeData | HGameData | AnimeData | SeigaData | ResultData;
}

interface ResultHeader {
	similarity: string;
    thumbnail:  string;
	index_id:	number;
    index_name: string;
    dupes:      number;
}