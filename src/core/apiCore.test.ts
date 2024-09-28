import { apiFactory } from "./apiCore";
import { mockApi, mockResponse } from "@/jest/__mocks__/mockApiCore";
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

    it("should return correctly response in simple post  ", async () => {

        const response  =  await  api.post({
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
        expect(response).toEqual(mockResponse);
    });
});
