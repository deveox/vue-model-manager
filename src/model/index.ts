import { Axios, Method } from "axios";
import Field from "../field";
import ValidationError from "../validation/error";

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
      this._fields[f.name] = f;
      f.register(this, data[f.name]);
    });
  }

  validate(): ValidationError | null {
    for (const name in this._fields) {
      if (Object.prototype.hasOwnProperty.call(this._fields, name)) {
        const f = this._fields[name];
        let err = f.validate(this);
        if (err) return err;
      }
    }
    return null;
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
