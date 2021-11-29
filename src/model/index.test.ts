import Model from ".";
import Field from "../field";
import { TestModel } from "../test-data";

describe("class Model", () => {
  test("constructor()", () => {
    let res = new TestModel();
    // Default values were set
    expect(res.id).toBe(undefined);
    expect(res.name).toBe("default");

    let input = { id: 2, name: "test name 2", age: 13 };
    res = new TestModel(input);
    // Field values were set
    expect(res.id).toBe(input.id);
    expect(res.name).toBe(input.name);
    // Prevent write of field which wasn't registered
    expect(res).not.toHaveProperty("age");
  });
  test("validate()", () => {});
  test("get _name()", () => {
    let res = new TestModel();
    expect(res._name).toBe("TestModel");
  });
});
