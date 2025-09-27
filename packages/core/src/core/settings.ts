import { FetchProvider,BaseFetch } from "./types";
import { validationAuth } from "./validationAuth";
import { withRetry, mergeRetryOptions } from "./retryUtils";

const MIN_ATTEMPTS = 1;

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
    
    // If retry is configured, use retry logic
    if (args?.opts?.retry) {
        const retryOptions = mergeRetryOptions(args.opts.retry);
        
        return withRetry(() => fetchProvider.fetch(uri, options),
            retryOptions,
            MIN_ATTEMPTS,
            (attempt, error) => {
                // Log retry attempts (can be replaced with proper logging)
                // eslint-disable-next-line no-console
                console.warn(`Retry attempt ${attempt} for ${method} ${uri}: ${error.message}`);
            }
        );
    }
    
    return fetchProvider.fetch(uri, options);
}
