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
});
