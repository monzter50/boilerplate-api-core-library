import { FetchProvider } from '../core';

export class DomFetchProvider implements FetchProvider {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
        return fetch(input, init);
    }
}
