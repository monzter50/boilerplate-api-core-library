import { settings } from "./settings";
import { mockFetchProvider } from "@/jest/__mocks__/mockApiCore";

describe("settings", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call fetchProvider.fetch with correct parameters for GET request", async () => {
        await settings(mockFetchProvider, {
            method: "GET",
            url: "https://api.example.com/posts",
        });

        expect(mockFetchProvider.fetch).toHaveBeenCalledWith(
            "https://api.example.com/posts",
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
    });

    it("should throw ApiError when requiredAuth is true but no token provided", async () => {
        await expect(settings(mockFetchProvider, {
            method: "GET",
            url: "https://api.example.com/posts",
            opts: {
                requiredAuth: true
            }
        })).rejects.toThrow("Required Token");
    });

    it("should throw ApiError when requiredOtp is true but no otpToken provided", async () => {
        await expect(settings(mockFetchProvider, {
            method: "GET",
            url: "https://api.example.com/posts",
            opts: {
                requiredOtp: true
            }
        })).rejects.toThrow("Required Otp Token");
    });

    it("should pass validation when requiredAuth is true and token is provided", async () => {
        await settings(mockFetchProvider, {
            method: "GET",
            url: "https://api.example.com/posts",
            opts: {
                requiredAuth: true
            },
            authentication: {
                token: "token"
            }
        });

        expect(mockFetchProvider.fetch).toHaveBeenCalledWith(
            "https://api.example.com/posts",
            {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer token" 
                },
            }
        );
    });

    it("should pass validation when requiredOtp is true and otpToken is provided", async () => {
        await settings(mockFetchProvider, {
            method: "GET",
            url: "https://api.example.com/posts",
            opts: {
                requiredOtp: true
            },
            authentication: {
                otpToken: "token"
            }
        });

        expect(mockFetchProvider.fetch).toHaveBeenCalledWith(
            "https://api.example.com/posts",
            {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "otp-token": "token" 
                },
            }
        );
    });

    it("should call fetchProvider.fetch with correct parameters for POST request", async () => {
        const body = { title: "Test Post" };
        await settings(mockFetchProvider, {
            method: "POST",
            url: "https://api.example.com/posts",
            body,
        });

        expect(mockFetchProvider.fetch).toHaveBeenCalledWith(
            "https://api.example.com/posts",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );
    });

    it("should use default URL if not provided", async () => {
        await settings(mockFetchProvider, {
            method: "GET",
            url: "https://api.example.com/posts",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
        });

        expect(mockFetchProvider.fetch).toHaveBeenCalledWith(
            "https://api.example.com/posts",
            expect.any(Object)
        );
    });

    it("should handle FormData body correctly", async () => {
        const formData = new FormData();
        formData.append("key", "value");

        await settings(mockFetchProvider, {
            method: "POST",
            url: "https://api.example.com/upload",
            body: formData,
        });

        expect(mockFetchProvider.fetch).toHaveBeenCalledWith(
            "https://api.example.com/upload",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: formData,
            }
        );
    });

    it("should retry when opts.retry is provided and succeed", async () => {
        jest.useFakeTimers();
        const fetchMock = mockFetchProvider.fetch as unknown as jest.Mock;
        
        // Fail twice with 500, then succeed with 200
        fetchMock
            .mockResolvedValueOnce({ ok: false,
                status: 500,
                statusText: "Server Error" } as unknown as Response)
            .mockResolvedValueOnce({ ok: false,
                status: 500,
                statusText: "Server Error" } as unknown as Response)
            .mockResolvedValueOnce({ ok: true,
                status: 200,
                statusText: "OK" } as unknown as Response);

        const promise = settings(mockFetchProvider, {
            method: "GET",
            url: "https://api.example.com/retry",
            opts: {
                retry: {
                    maxRetries: 2,
                    retryDelay: 1,
                    retryDelayMultiplier: 1,
                    maxRetryDelay: 5,
                    retryOnStatus: [ 500 ],
                    retryOnNetworkError: true,
                },
            },
        });

        // Advance timers for both retries
        await jest.runOnlyPendingTimersAsync();
        await jest.runOnlyPendingTimersAsync();
        await promise;

        expect(fetchMock).toHaveBeenCalledTimes(3);

        jest.useRealTimers();
    });
});
