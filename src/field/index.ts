import { Validators } from "./validators";

export default class Field<Type> {
  // External field name (e.g. in JSON response from server)
  // externalName: string
  // Does this field included in search query
  inSearch: boolean;
  byDefault: Type | undefined;
  value: Type | undefined;
  validators: Validators;
  constructor(
    byDefault: Type | undefined = undefined,
    inSearch: boolean = false,
    validators: Validators = []
  ) {
    console.log("create field with value", byDefault);
    this.inSearch = inSearch;
    this.byDefault = byDefault;
    if (this.byDefault !== undefined) {
      this.value = this.byDefault;
    }
    this.validators = validators;
  }
  set(value: Type) {
    console.log("set field with value", value);
    this.value = value;
  }
}
