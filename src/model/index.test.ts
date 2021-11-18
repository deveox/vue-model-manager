import Model from ".";
import Field from "../field";

class TestModel extends Model {
  baseRoute = "/test";

  id = new Field<number>(1);
  name = new Field<string>("test name");

  constructor(data?: object) {
    super();
    return this.set(data);
  }
}

describe("class Model", () => {
  test("constructor works", () => {
    let input = { id: 2, name: "test name 2" };
    let m = new TestModel(input);
    for (const k in m) {
      if (Object.prototype.hasOwnProperty.call(m, k)) {
        const element = m[k];
        console.log(element);
      }
    }
    console.log("get m.id:");
    console.log(m.id);
    console.log("get m.id.value:");
    console.log(m.id.value);
    // expect(m.id.value).toBe(input.id);
    // expect(m.name.value).toBe(input.name);
  });
});
