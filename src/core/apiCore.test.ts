import { apiFactory } from "./apiCore";
import { mockApi, mockResponse, mocResponsePost } from "@/jest/__mocks__/mockApiCore";
import { api } from "@/client";

describe("apiCore Client", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should export a function", () => {
        expect(apiFactory).toBeInstanceOf(Function);
    });

    it("should return an object with a post method", () => {
        expect(typeof api.post).toBe("function");
    });

    it("should  return correctly response simple get", async () => {
        const response = await api.get({
            url: "https://jsonplaceholder.typicode.com/posts/1",
            contentType: "application/json",
        });
        expect(mockApi.get).toHaveBeenCalledTimes(1);
        expect(mockApi.get).toHaveBeenCalledWith({
            url: "https://jsonplaceholder.typicode.com/posts/1",
            contentType: "application/json",
        });
        expect(response).toEqual(mockResponse);
    });
    it("should return correctly response in simple post  ", async () => {

        const response  =  await  api.post<{
           created: string;
            id: number;
            }>({
                url: "https://jsonplaceholder.typicode.com/posts",
                body: {
                    title: "foo",
                    body: "bar",
                    userId: 1,
                },
                contentType: "application/json",
            });

        expect(mockApi.post).toHaveBeenCalledTimes(1);
        expect(mockApi.post).toHaveBeenCalledWith({
            url: "https://jsonplaceholder.typicode.com/posts",
            body: {
                title: "foo",
                body: "bar",
                userId: 1,
            },
            contentType: "application/json",
        });
        expect(response).toEqual(mocResponsePost);
    });
});
