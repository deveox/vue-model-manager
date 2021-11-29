import Field from "./field";
import Model from "./model";

export class TestModel extends Model {
  baseRoute = "/test";

  id: number;
  name: string;
  email: string;

  fields() {
    return ["id", new Field("name", "default"), new Field("email")];
  }
}
