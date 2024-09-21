// Function to check if the code is running on the client
import {OptionsProps} from "./types";
import {settings} from "./settings";
import {FetchProvider} from "./types";
export function apiFactory(fetchProvider: FetchProvider) {
    return {
        post: async (args: OptionsProps) => {
            try {
                const response = await settings(fetchProvider,{
                    method: 'POST',
                    url: args.url,
                    body: args.body,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error(args?.defaultErr ?? "Something went wrong posting the data");
                }
                const result = await response.json();
                return { response: result, status: "ok" };
            } catch (error) {
                return { response: error, status: "error" };
            }
        },
        get: async (args: OptionsProps) => {
            try {
                const response = await settings(fetchProvider,{
                    method: 'GET',
                    url: args.url,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode,
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error(args?.defaultErr ?? "Something went wrong getting the data");
                }
                const result = await response.json();
                return { response: result, status: "ok" };
            } catch (error) {
                return { response: error, status: "error" };
            }
        },
        delete: async (args: OptionsProps) => {
            try {
                const response = await settings(fetchProvider,{
                    method: 'DELETE',
                    url: args.url,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode,
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error("Something went wrong deleting the data");
                }
                const result = await response.json();
                return { response: result, status: "ok" };
            } catch (error) {
                return { response: error, status: "error" };
            }
        },
        patch: async (args: OptionsProps) => {
            try {
                const response = await settings(fetchProvider,{
                    method: 'PATCH',
                    url: args.url,
                    headers: { "Content-Type": args.contentType },
                    mode: args?.mode,
                    body: args.body
                });
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error("Something went wrong patching the data");
                }
                const result = await response.json();
                return { response: result, status: "ok" };
            } catch (error) {
                return { response: error, status: "error" };
            }
        },
    }
}
