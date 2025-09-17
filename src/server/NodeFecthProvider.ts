import { FetchProvider } from "@/core";

export class NodeFetchProvider implements FetchProvider {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        // Use global fetch (Node 18+) to match DOM Response types
        return globalThis.fetch(input, init);
    }
}
