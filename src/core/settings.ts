import { FetchProvider,BaseFetch } from "./types";

export function settings(fetchProvider:FetchProvider,{
    method = "GET",
    headers =  { "Content-Type": "application/json" },
    body = {},
    ...args
}:BaseFetch) {
    const uri = args?.url ?? "https://jsonplaceholder.typicode.com/posts";
    const options: RequestInit = {
        method: method ?? "GET",
        headers: {
            ...headers,
        },
    };

    if (method === "POST" || method === "DELETE" || method === "PATCH") {
        options.body = body instanceof FormData ? body : JSON.stringify(body);
    }
    return fetchProvider.fetch(uri, options);
}
