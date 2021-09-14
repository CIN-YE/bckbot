// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface SaucenaoApiResponse {
    header:  Header;
    results: Result[];
}

export interface Header {
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

export interface Index {
    status:    number;
    parent_id: number;
    id:        number;
    results:   number;
}

export interface Result {
    header: ResultHeader;
    data:   Data;
}

export interface Data {
    ext_urls?:                string[];
    danbooru_id?:             number;
    yandere_id?:              number;
    gelbooru_id?:             number;
	konachan_id?:             number;
    creator?:                 string[] | string;
    material?:                string;
    characters?:              string;
    source?:                  string;
    title?:                   string;
    part?:                    string;
    date?:                    string;
    eng_name?:                string;
    jp_name?:                 string;
    created_at?:              string;
    pawoo_id?:                number;
    pawoo_user_acct?:         string;
    pawoo_user_username?:     string;
    pawoo_user_display_name?: string;
    pixiv_id?:                number;
    member_name?:             string;
    member_id?:               number;
    tweet_id?:                string;
    twitter_user_id?:         string;
    twitter_user_handle?:     string;
    pg_id?:                   number;
    md_id?:                   number;
    mu_id?:                   number;
    mal_id?:                  number;
    artist?:                  string;
    author?:                  string;
    type?:                    string;
    fn_id?:                   number;
    fn_type?:                 string;
    author_name?:             string;
    author_url?:              string;
    da_id?:                   string;
    anidb_aid?:               number;
    year?:                    string;
    est_time?:                string;
    fa_id?:                   number;
    bcy_id?:                  number;
    member_link_id?:          number;
    bcy_type?:                string;
    seiga_id?:                number;
    sankaku_id?:              number;
	[key: string]:            any;
}

export interface ResultHeader {
    similarity: string;
    thumbnail:  string;
    index_id:   number;
    index_name: string;
    dupes:      number;
}