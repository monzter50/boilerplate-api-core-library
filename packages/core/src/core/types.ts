export type Primitive = number | string | boolean | null | undefined;
export type JSONObject = { [k: string]: JSONTypes };
export type JSONArray = JSONTypes[];
export type JSONTypes = JSONArray | JSONObject | Primitive;

export type Method = "GET" | "POST" | "DELETE" | "PATCH";
export type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin"

export interface RetryConfig {
    maxRetries?: number;
    retryDelay?: number;
    retryDelayMultiplier?: number;
    maxRetryDelay?: number;
    retryOnStatus?: number[];
    retryOnNetworkError?: boolean;
}

export interface OptionsProps {
    requiredAuth?: boolean;
    requiredOtp?: boolean;
    retry?: RetryConfig;
}

export interface AuthOpts {
    authentication?: Authentication;
    opts?:OptionsProps;
}
export interface BaseFetch extends  AuthOpts {
    method?: Method;
    params?: unknown;
    url: string;
    headers?: {
        "Content-Type": string;
    };
    mode?: RequestMode;
    body?: FormData | JSONTypes;
   
} 

export type Authentication ={
    token?: string;
    otpToken?: string;
}

export interface ArgsProps extends AuthOpts {
    contentType: string | "";
    mode?: RequestMode;
    body?: FormData | JSONTypes;
    defaultErr?: string;
    url: string;
}

export interface FetchProvider {
    // eslint-disable-next-line no-unused-vars
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}

export interface ApiResponse<T> {
    response: T;
    status: "ok" | "error";
}
