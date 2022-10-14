export interface HttpbinInterface {
    args: Args;
    data: string;
    files: Files;
    form: Files;
    headers: Headers;
    origin: string;
    url: string;
}

export interface Args {
    arg: string;
}

export interface Files {
}

export interface Headers {
    Accept: string;
    "Accept-Encoding": string;
    "Accept-Language": string;
    Host: string;
    Origin: string;
    Referer: string;
    "Sec-Ch-Ua": string;
    "Sec-Ch-Ua-Mobile": string;
    "Sec-Ch-Ua-Platform": string;
    "Sec-Fetch-Dest": string;
    "Sec-Fetch-Mode": string;
    "Sec-Fetch-Site": string;
    "User-Agent": string;
    "X-Amzn-Trace-Id": string;
    "X-Requested-With": string;
}
