import { Axios, Method } from "axios";
import Field from "../field";
import { empty, notEmpty } from "../field/validators";

export default abstract class Model {
  abstract baseRoute: string;

  _fields: { [name: string]: Field };
  abstract fields(): (string | Field)[];

  constructor(data: object = {}) {
    this._fields = {};
    this.fields().forEach((f) => {
      if (typeof f === "string") {
        f = new Field(f);
      }
      this._fields[f._name] = f;
      Object.defineProperty(this, f._name, {
        value: data[f._name] || f._default,
        enumerable: true,
        writable: f._writable,
      });
    });
  }

  validate(): boolean {
    for (const name in this._fields) {
      if (Object.prototype.hasOwnProperty.call(this._fields, name)) {
        const f = this._fields[name];
        const v = this[f._name];
        if (f._required) {
          if (empty(v)) return false;
        }
        f._validators.forEach((validator) => {
          if (!validator(v)) return false;
        });
      }
    }
    return true;
  }
  // normalizeRequestData(args) {
  //   if (args) return args;
  //   let normalized = {};
  //   for (const k in this.data) {
  //     if (Object.prototype.hasOwnProperty.call(this.data, k)) {
  //       if (!["$"].includes(k)) normalized[k] = this.data[k];
  //     }
  //   }
  //   return normalized;
  // }

  // get normalizedRequest(): any {
  //   let res = {} as { [name: string]: any };
  //   for (const name in this.fields) {
  //     if (Object.prototype.hasOwnProperty.call(this.fields, name)) {
  //       res[name] = this.fields[name].value;
  //     }
  //   }
  //   return res;
  // }

  // static $http: Axios;
  // static request(method: Method, route: string, data?: object) {
  //   return Model.$http.request({
  //     method,
  //     url: route,
  //     data,
  //   });
  // }
}
