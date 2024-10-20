import { ApiResponse, OptionsProps, FetchProvider } from "./types";
import { settings } from "@/core/settings";
import { ApiError } from "@/errors/ApiError";
export function apiFactory(fetchProvider: FetchProvider) {
    return {
        post: async<T> (args: OptionsProps):Promise<ApiResponse<T>> => {
            try {
                const response = await settings(fetchProvider,{
                    method: "POST",
                    url: args.url,
                    body: args.body,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new ApiError(args?.defaultErr ?? "Something went wrong posting the data");
                }
                const result = await response.json();
                return { response: result as T,
                    status: "ok" };
            } catch (error) {

                return { response: error as unknown as T,
                    status: "error" };
            }
        },
        get: async <T>(args: OptionsProps):Promise<ApiResponse<T>> => {
            try {
                const response = await settings(fetchProvider,{
                    method: "GET",
                    url: args.url,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode,
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new ApiError(args?.defaultErr ?? "Something went wrong getting the data");
                }
                const result = await response.json();
                return { response: result as T,
                    status: "ok" };
            } catch (error) {
                return { response: error as T,
                    status: "error" };
            }
        },
        delete: async<T> (args: OptionsProps):Promise<ApiResponse<T>> => {
            try {
                const response = await settings(fetchProvider,{
                    method: "DELETE",
                    url: args.url,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode,
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new ApiError("Something went wrong deleting the data");
                }
                const result = await response.json();
                return { response: result as T,
                    status: "ok" };
            } catch (error) {
                return { response: error as T,
                    status: "error" };
            }
        },
        patch: async <T>(args: OptionsProps):Promise<ApiResponse<T>> => {
            try {
                const response = await settings(fetchProvider,{
                    method: "PATCH",
                    url: args.url,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode,
                    body: args.body
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new ApiError("Something went wrong patching the data");
                }
                const result = await response.json();
                return { response: result as T,
                    status: "ok" };
            } catch (error) {
                return { response: error as T,
                    status: "error" };
            }
        },
    };
}
