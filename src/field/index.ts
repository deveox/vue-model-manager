import Model from "../model";
import ValidationRule from "../validation/rule";

export default class Field {
  // External field name (e.g. in JSON response from server)
  // externalName: string
  // Does this field included in search query
  name: string;
  #default: any;
  #writable: boolean = true;
  #fields: Field[];
  #validation: ValidationRule = new ValidationRule("", (v) => true);

  constructor(name: string, defaultValue?: any, fields: Field[] = []) {
    this.name = name;
    this.#default = defaultValue;
    this.#fields = fields;
  }

  readonly() {
    this.#writable = false;
    return this;
  }

  validation(r: ValidationRule) {
    this.#validation = r;
  }

  validate(m: Model) {
    return this.#validation.run(m[this.name], m);
  }

  register(target: object, input: any) {
    if (this.name in target) {
      Reflect.deleteProperty(target, this.name);
    }
    let value = input || this.#default;
    if (this.#fields.length) {
      value = {};
      if (!input || typeof input !== "object") {
        input = {};
      }
      this.#fields.forEach((sf) => {
        sf.register(value, input[sf.name]);
      });
    }
    Object.defineProperty(target, this.name, {
      value,
      enumerable: true,
      writable: this.#writable,
    });
  }
}
