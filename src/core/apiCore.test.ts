import {apiFactory} from "./apiCore";
import {api} from "../client";

describe("apiCore Client", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should export a function", () => {
    expect(apiFactory).toBeInstanceOf(Function);
  });
  it("should return an object with a post method", () => {
    expect(api.post).toBeInstanceOf(Function);
  });
  // Generate test how get response object from post method


})
