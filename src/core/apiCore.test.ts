import { apiFactory } from "./apiCore";
import {
    mockApi,
    mockFetchProvider,
    mockResponse,
    mockSettings,
    mocResponseDelete,
    mocResponsePost
} from "@/jest/__mocks__/mockApiCore";
import { settings } from "./settings";
import { ApiError } from "@/errors/ApiError";
jest.mock("./settings");

describe("apiCore Client", () => {
    let api: ReturnType<typeof apiFactory>;
    beforeEach(() => {
        jest.clearAllMocks();
        api = apiFactory(mockFetchProvider);
    });

    it("should export a function", () => {
        expect(apiFactory).toBeInstanceOf(Function);
    });

    it("should return an object with a post method", () => {
        expect(typeof api.post).toBe("function");
    });

    describe("post method", () => {
        it("should return correctly response in simple post  ", async () => {
            mockSettings.mockResolvedValue({
                status: 201,
                json: jest.fn().mockResolvedValue(mocResponsePost.response),
            });
            const response = await api.post({
                url: "https://api.example.com/posts",
                body: { title: "Test Post" },
                contentType: "application/json",
            });

            expect(settings).toHaveBeenCalledWith(mockFetchProvider, {
                method: "POST",
                url: "https://api.example.com/posts",
                body: { title: "Test Post" },
                headers: { "Content-Type": "application/json" },
                mode: undefined,
            });
            expect(response).toEqual(mocResponsePost);
        });
        it("should handle errors in POST request", async () => {
            mockSettings.mockRejectedValue(new ApiError("Network error"));
            const response = await api.post({
                url: "https://api.example.com/posts",
                body: { title: "Test Post" },
                contentType: "application/json",
            });
            expect(response).toEqual({
                response: new Error("Network error"),
                status: "error",
            });
        });
        it("should throw ApiError for non-200/201 status codes", async () => {
            mockSettings.mockResolvedValue({
                status: 400,
                json: jest.fn().mockResolvedValue({ error: "Bad Request" }),
            });

            await expect(
                api.post({
                    url: "https://api.example.com/posts",
                    body: { title: "Test Post" },
                    contentType: "application/json",
                })
            ).resolves.toEqual({
                response: new ApiError("Something went wrong posting the data"),
                status: "error",
            });
        });
    });
    describe("get method", () => {
        it("should  return correctly response simple get", async () => {
            mockSettings.mockResolvedValue({
                status: 200,
                json: jest.fn().mockResolvedValue(mockResponse.response),
            });

            const response = await api.get({
                url: "https://api.example.com/posts",
                contentType: "application/json",
            });

            expect(settings).toHaveBeenCalledWith(mockFetchProvider, {
                method: "GET",
                url: "https://api.example.com/posts",
                headers: { "Content-Type": "application/json" },
                mode: undefined,
            });

            expect(response).toEqual(mockResponse);
        });
        it("should handle errors in GET request", async () => {
            mockSettings.mockRejectedValue(new ApiError("Network error"));

            const response = await api.get({
                url: "https://api.example.com/posts/1",
                contentType: "application/json",
            });

            expect(response).toEqual({
                response: new ApiError("Network error"),
                status: "error",
            });
        });
        it("should throw ApiError for non-200/201 status codes", async () => {
            mockSettings.mockResolvedValue({
                status: 400,
                json: jest.fn().mockResolvedValue({ error: "Bad Request" }),
            });

            await expect(
                api.get({
                    url: "https://api.example.com/posts",
                    contentType: "application/json",
                })
            ).resolves.toEqual({
                response: new ApiError("Something went wrong getting the data"),
                status: "error",
            });
        });
    });
    describe("delete method", () => {
        it("should return correctly response in simple post  ", async () => {
            mockSettings.mockResolvedValue({
                status: 201,
                json: jest.fn().mockResolvedValue(mocResponsePost.response),
            });
            const response = await api.delete({
                url: "https://api.example.com/posts/1",
                contentType: "application/json",
            });

            expect(settings).toHaveBeenCalledWith(mockFetchProvider, {
                method: "DELETE",
                url: "https://api.example.com/posts/1",
                headers: { "Content-Type": "application/json" },
                mode: undefined,
            });
            expect(response).toEqual(mocResponseDelete);
        });
        it("should handle errors in DELETE request", async () => {
            mockSettings.mockRejectedValue(new Error("Network error"));

            const result = await api.delete({
                url: "https://api.example.com/posts/1",
                contentType: "application/json",
            });

            expect(result).toEqual({
                response: new Error("Network error"),
                status: "error",
            });
        });
        it("should throw ApiError for non-200/201 status codes", async () => {
            mockSettings.mockResolvedValue({
                status: 400,
                json: jest.fn().mockResolvedValue({ error: "Bad Request" }),
            });

            await expect(
                api.delete({
                    url: "https://api.example.com/posts/1",
                    contentType: "application/json",
                })
            ).resolves.toEqual({
                response: new ApiError("Something went wrong deleting the data"),
                status: "error",
            });
        });
    });
    describe("patch method", () => {
        it("should make a successful PATCH request", async () => {
            mockSettings.mockResolvedValue({
                status: 200,
                json: jest.fn().mockResolvedValue({ id: 1,
                    title: "Updated Post" }),
            });

            const result = await api.patch({
                url: "https://api.example.com/posts/1",
                body: { title: "Updated Post" },
                contentType: "application/json",
            });

            expect(settings).toHaveBeenCalledWith(mockFetchProvider, {
                method: "PATCH",
                url: "https://api.example.com/posts/1",
                body: { title: "Updated Post" },
                headers: { "Content-Type": "application/json" },
                mode: undefined,
            });
            expect(result).toEqual({
                response: { id: 1,
                    title: "Updated Post" },
                status: "ok",
            });
        });
        it("should handle errors in PATCH request", async () => {
            mockSettings.mockRejectedValue(new Error("Network error"));

            const result = await api.patch({
                url: "https://api.example.com/posts/1",
                body: { title: "Updated Post" },
                contentType: "application/json",
            });

            expect(result).toEqual({
                response: new Error("Network error"),
                status: "error",
            });
        });
        it("should throw ApiError for non-200/201 status codes", async () => {
            mockSettings.mockResolvedValue({
                status: 400,
                json: jest.fn().mockResolvedValue({ error: "Bad Request" }),
            });

            await expect(
                api.patch({
                    url: "https://api.example.com/posts/1",
                    body: { title: "Updated Post" },
                    contentType: "application/json",
                })
            ).resolves.toEqual({
                response: new ApiError("Something went wrong patching the data"),
                status: "error",
            });
        });
    });
});
