import { settings } from "@/core";

jest.mock("@/core/settings");
export const mockResponse = {
    response: {
        id: 1,
        title: "Test Post",
        body: "This is a test post"
    },
    status: "ok"
};

export const mocResponsePost = {
    response: {
        id: 101,
        created: "2023-06-01T12:00:00Z"
    },
    status: "ok"
};

export const mockError = {
    response: "Something went wrong getting the data",
    status: "error"
};

export const mocResponseDelete = {
    response: {
        id: 101,
        created: "2023-06-01T12:00:00Z",
    },
    status: "ok"
};

export const mockApi = {
    get: jest.fn().mockResolvedValue(mockResponse),
    post: jest.fn().mockResolvedValue(mocResponsePost),
    delete: jest.fn().mockResolvedValue(mockResponse),
    patch: jest.fn().mockResolvedValue(mockResponse),
};
export const mockFetchProvider = {
    fetch: jest.fn().mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue(mockResponse.response),
    }),
};

export const apiFactory: jest.Mock = jest.fn().mockReturnValue(mockApi);

export const mockSettings:jest.Mock =settings as jest.Mock;
