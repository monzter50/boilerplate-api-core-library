import { FetchProvider,BaseFetch } from "./types";
import { validationAuth } from "./validationAuth";

export async function settings(fetchProvider:FetchProvider,{
    method = "GET",
    headers =  { "Content-Type": "application/json" },
    body = {},
    ...args
}:BaseFetch) {
    const uri = args?.url;
    
    validationAuth(args?.opts, args?.authentication);
    
    const options: RequestInit = {
        method: method ?? "GET",
        headers: {
            ...headers,
        },
    };
    
    if (args?.authentication?.token && args?.opts?.requiredAuth) {
        (options.headers as Record<string, string>)["Authorization"] = `Bearer ${args.authentication.token}`;
    }

    if (args?.authentication?.otpToken && args?.opts?.requiredOtp) {
        (options.headers as Record<string, string>)["otp-token"] = args.authentication.otpToken;
    }

    if (method === "POST" || method === "DELETE" || method === "PATCH") {
        options.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    return fetchProvider.fetch(uri, options);
  
}
