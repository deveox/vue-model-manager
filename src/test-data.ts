import Field from "./field";
import Model from "./model";

export class TestModel extends Model {
  baseRoute = "/test";

  name!: string;
  email!: string;

  fields() {
    return [new Field("name", "default"), new Field("email")];
  }
}
