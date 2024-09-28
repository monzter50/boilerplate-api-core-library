import { FetchProvider } from "@/core";
import fetch, { RequestInfo as NodeRequestInfo, RequestInit as NodeRequestInit } from "node-fetch";

export class NodeFetchProvider implements FetchProvider {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        return fetch(input as NodeRequestInfo, init as NodeRequestInit) as Promise<Response>;
    }
}
