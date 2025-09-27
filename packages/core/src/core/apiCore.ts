import { ApiResponse, ArgsProps, FetchProvider, Method } from "./types";
import { settings } from "./settings";
import { ApiError } from "../errors/ApiError";
export function apiFactory(fetchProvider: FetchProvider) {
    async function perform<T>(method: Method, args: ArgsProps, action: string): Promise<ApiResponse<T>> {

        const base = {
            method,
            url: args.url,
            headers: { "Content-Type": args.contentType },
            mode: args?.mode,
            opts : args?.opts,
            authentication: args?.authentication
        } as const;

        const withBody = method === "POST" || method === "PATCH"
            ? {
                body: args.body,
            }
            : {};

        const response = await settings(
            fetchProvider,
            {
                ...base,
                ...withBody,
            }
        );
        
        // Check for successful status codes
        if (response.status !== 200 && response.status !== 201) {
            // If retry is configured and this is a retryable error, let the retry logic handle it
            if (args?.opts?.retry) {
                throw new ApiError(`HTTP ${response.status}: ${response.statusText}`);
            }
            throw new ApiError(args?.defaultErr ?? `Something went wrong ${action} the data`);
        }
        const result = await response.json();
        return {
            response: result as T,
            status: "ok",
        };
       
    }

    return {
        post: <T>(args: ArgsProps) => perform<T>(
            "POST",
            args,
            "posting"
        ),
        get: <T>(args: ArgsProps) => perform<T>(
            "GET",
            args,
            "getting"
        ),
        delete: <T>(args: ArgsProps) => perform<T>(
            "DELETE",
            args,
            "deleting"
        ),
        patch: <T>(args: ArgsProps) => perform<T>(
            "PATCH",
            args,
            "patching"
        ),
    };
}
