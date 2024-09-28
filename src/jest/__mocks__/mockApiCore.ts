import { api } from "@/client";
jest.mock("@/client", () => ({
    api: {
        post: jest.fn(()=>Promise.resolve(mockResponse)),
    }
}));
export const mockApi = api as jest.Mocked<typeof api>;

export const mockResponse = {
    response: {
        body: {
            title: "foo",
            body: "bar",
            userId: 1,
            id: 101
        }
    },
    status: "ok"
};
