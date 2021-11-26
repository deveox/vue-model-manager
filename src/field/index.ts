import { Validators } from "./validators";

export default class Field {
  // External field name (e.g. in JSON response from server)
  // externalName: string
  // Does this field included in search query
  _name: string;
  _default: any;
  _validators: Validators = [];
  _writable: boolean = true;
  _required: boolean = false;
  constructor(name: string, defaultValue?: any) {
    this._name = name;
    this._default = defaultValue;
  }
  required() {
    this._required = true;
    return this;
  }
  validators(...validators: Validators) {
    this._validators = validators;
    return this;
  }
  readonly() {
    this._writable = false;
    return this;
  }
}
