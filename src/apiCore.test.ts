import {apiFactory} from "./apiCore";
describe("apiCore", () => {
  it("should export a function", () => {
    expect(apiFactory).toBeInstanceOf(Function);
  });
})
