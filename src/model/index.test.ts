import Model from ".";
import Field from "../field";
import { validEmail } from "../field/validators";

// validators
class TestModel extends Model {
  baseRoute = "/test";

  id: number;
  name: string;
  email: string;

  fields() {
    return [
      "id",
      new Field("name", "default").required(),
      new Field("email").validators(validEmail),
    ];
  }
}

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
  test("validate()", () => {
    let input = { id: 2, name: "test name 2", email: 13 };
    res = new TestModel(input);
    // Field values were set
    expect(res.id).toBe(input.id);
    expect(res.name).toBe(input.name);
    // Prevent write of field which wasn't registered
    expect(res).not.toHaveProperty("age");
  });
});
