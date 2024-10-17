import { api, FetchProvider } from "@/client";
jest.mock("@/client", () => ({
    api: {
        post: jest.fn(()=>Promise.resolve(mocResponsePost)),
        get: jest.fn(()=>Promise.resolve(mockResponse)),
        delete: jest.fn(()=>Promise.resolve(mocResponseDelete))
    }
}));
export const mockApi = api as jest.Mocked<typeof api>;
export const mockFetchProvider: FetchProvider = {
    fetch: jest.fn(),
};
export const mockResponse = {
    response: {
        title: "foo",
        body: "bar",
        userId: 1,
        id: 101
    },
    status: "ok"
};

export const mockError = {
    response: "Something went wrong getting the data",
    status: "error"
};

export const mocResponsePost = {
    response: {
        created: "111",
        id: 101
    },
    status: "ok"
};

export const mocResponseDelete = {
    response: "The post was deleted",
    status: "ok"
};
