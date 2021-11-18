import { Axios, Method } from "axios";
import Field from "../field";

export default abstract class Model {
  abstract baseRoute: string;
  [name: string | symbol]: any;

  normalizeRequestData(args) {
    if (args) return args;
    let normalized = {};
    for (const k in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, k)) {
        if (!["$"].includes(k)) normalized[k] = this.data[k];
      }
    }
    return normalized;
  }

  set(data?: object, reset = false) {
    if (!data) return;
    if (reset) {
      for (const name in this) {
        if (Object.prototype.hasOwnProperty.call(this, name)) {
          if ((this[name] as any) instanceof Field) {
            (this[name] as Field<any>).set(this[name].byDefault);
          }
        }
      }
    }
    for (const name in data) {
      console.log(name, this);
      if (Object.prototype.hasOwnProperty.call(data, name)) {
        if (this[name] instanceof Field) {
          console.log(name, "is instance of Field", this[name]);
          this[name].set(data[name]);
        }
      }
    }

    return new Proxy(this, {
      get(target, prop) {
        console.log(target, prop);
        if (target[prop] instanceof Field) {
          return target[prop].value;
        }
        return target[prop];
      },
      set(target, prop, val) {
        if (prop in target) {
          if (target[prop] instanceof Field) {
            target[prop].set(val);
          } else {
            target[prop] = val;
          }
          return true;
        }
        return false;
      },
    });
  }

  get normalizedRequest(): any {
    let res = {} as { [name: string]: any };
    for (const name in this.fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, name)) {
        res[name] = this.fields[name].value;
      }
    }
    return res;
  }

  static $http: Axios;
  static request(method: Method, route: string, data?: object) {
    return Model.$http.request({
      method,
      url: route,
      data,
    });
  }
}
