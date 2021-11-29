import Manager from ".";
import { TestModel } from "./test-data";

describe("class Manager", () => {
  test("constructor()", () => {
    let mm = new Manager(undefined, { models: [TestModel] });
    expect(mm.has("TestModel")).toBe(true);
  });
  test("new()", () => {
    let mm = new Manager(undefined, { models: [TestModel] });
    let expected = new TestModel();
    let tm = mm.new("TestModel");
    expect(tm).toEqual(expected);
  });
});
