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
  return fetch(uri, options);
}



export function apiFactory() {
  return {
    post: (args: OptionsProps) => new Promise(function (resolve, reject) {
        settings({
            method: 'POST',
            url: args.url,
            body:args.body ,
            headers: { "Content-Type": args.contentType },
            mode: args?.mode
        })
            .then((response) => {
              if (response.status !== 200 && response.status !== 201) {
                return reject({
                  defaultErr :args?.defaultErr ?? "Something went wrong post the data",
                  status: response.status
                });
              }
              return response.json();
            })
            .then(result => {
                resolve({
                    response: result,
                    status: "ok"
                });
        }).catch((error) => {
            return reject({response:error, status: "error"});
        });
    }),
    get: (args: OptionsProps) => new Promise(function (resolve, reject) {
        settings({
            method: 'GET',
            url: args.url ,
            headers: { "Content-Type": args.contentType },
            mode: args?.mode,
        })
            .then((response) => {
              if (response.status !== 200 && response.status !== 201) {
                return reject({
                  defaultErr :args?.defaultErr ?? "Something went wrong getting the data",
                  status: response.status
                });
              }
              return response.json();
            })
            .then(result => {
                resolve({
                    response: result,
                    status: "ok"
                });
        }).catch((error) => {
            return reject({response:error, status: "error"});
        });
    }) ,
    delete: (args: OptionsProps) =>new  Promise(function (resolve, reject) {
        settings({
            method: 'DELETE',
            url: args.url,
            headers: { "Content-Type": args.contentType },
            mode: args?.mode,
        })
            .then((response) => {
              if (response.status !== 200 && response.status !== 201) {
                return reject({
                  defaultErr :"Something went wrong deleting the data",
                  status: response.status
                });
              }
              return response.json();
            })
            .then(result => {
                resolve({
                    response: result,
                    status: "ok"
                });
        }).catch((error) => {
            return reject({response:error, status: "error"});
        });
    }),
    patch: (args: OptionsProps) => new Promise(function (resolve, reject) {
        settings({
            method: 'PATCH',
            url: args.url,
            headers: { "Content-Type": args.contentType },
            mode: args?.mode,
            body: args.body
        })
            .then((response) => {
              if (response.status !== 200 && response.status !== 201) {
                return reject({
                  defaultErr :"Something went wrong patching the data",
                  status: response.status
                });
              }
              return response.json();
            })
            .then(result => {
                resolve({
                    response: result,
                    status: "ok"
                });
        }).catch((error) => {
            return reject({response:error, status: "error"});
        });
    }),
  }
}
