export type Primitive = number | string | boolean | null | undefined;
export type JSONObject = { [k: string]: JSONTypes };
export type JSONArray = JSONTypes[];
export type JSONTypes = JSONArray | JSONObject | Primitive;

export type Method = "GET" | "POST" | "DELETE" | "PATCH";
export type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin"
export interface BaseFetch {
  method?: Method;
  params?: any;
  url: string;
  headers?: {
    "Content-Type": string;
  };
  mode?: RequestMode;
  body?: FormData | JSONTypes;
}

export type OptionsProps = {
  contentType: string | "";
  mode?: RequestMode;
  body?: FormData | JSONTypes;
  defaultErr?: string;
  url: string;
};

// Function to check if the code is running on the server
function isServer(): boolean {
    return typeof window === 'undefined';
}

// Function to check if the code is running on the client
function isClient(): boolean {
    return typeof window !== 'undefined';
}

// Function to check if the code is running on the browser if is true return fetch else return fecth for server
function getFetch(): typeof fetch {
    return isClient() ? fetch : require('node-fetch');
}

function settings({
method = 'GET',
    headers =  { "Content-Type": "application/json" },
    body = {},
...args
}:BaseFetch) {
  const uri = args?.url ?? "https://jsonplaceholder.typicode.com/posts";
    const options: RequestInit = {
        method: method ?? 'GET',
        headers: {
            ...headers,
        },
    };

    if (method === 'POST' || method === 'DELETE' || method === 'PATCH') {
        options.body = body instanceof FormData ? body : JSON.stringify(body);
    }
    return getFetch()(uri, options);
}



export function apiFactory() {
    return {
        post: async (args: OptionsProps) => {
            try {
                const response = await settings({
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
                const response = await settings({
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
                const response = await settings({
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
                const response = await settings({
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
