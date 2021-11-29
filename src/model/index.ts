import { Axios, Method } from "axios";
import Manager from "..";
import Field from "../field";
import ValidationError from "../validation/error";

export interface ModelConstructor {
  new (data?: object): Model;
}
export default abstract class Model {
  static APIKey = "$";
  static axios: Axios;

  abstract baseRoute: string;
  #fields: { [name: string]: Field };
  #old?: Model;
  #isSaved = false;
  #isEdit = false;

  id: number | string;
  abstract fields(): (string | Field)[];
  constructor(data: object = {}) {
    this.apply(data);
  }

  validate(): ValidationError | null {
    for (const name in this.#fields) {
      if (Object.prototype.hasOwnProperty.call(this.#fields, name)) {
        const f = this.#fields[name];
        let err = f.validate(this);
        if (err) return err;
      }
    }
    return null;
  }

  get _name() {
    return this.constructor.name;
  }

  create() {
    return Model.axios
      .request({
        method: Manager.config.actions.create.request.method,
        url: Manager.config.actions.create.request.path(this),
        data: this.#data,
        ...Manager.config.actions.create.request.config,
      })
      .then(
        (resp) => {
          if (Manager.config.actions.create.response.apply) {
            this.apply(resp);
          }
          return Manager.config.actions.create.response.onSuccess(this, resp);
        },
        (err) => {
          return Manager.config.actions.create.response.onError(this, err);
        }
      );
  }

  save() {
    return Model.axios
      .request({
        method: Manager.config.actions.save.request.method,
        url: Manager.config.actions.save.request.path(this),
        data: this.#data,
        ...Manager.config.actions.save.request.config,
      })
      .then(
        (resp) => {
          this.#isSaved = true;
          this.#isEdit = false;
          if (Manager.config.actions.save.response.apply) {
            this.apply(resp);
          }
          return Manager.config.actions.save.response.onSuccess(this, resp);
        },
        (err) => {
          return Manager.config.actions.save.response.onError(this, err);
        }
      );
  }

  delete() {
    return Model.axios
      .request({
        method: Manager.config.actions.delete.request.method,
        url: Manager.config.actions.delete.request.path(this),
        data: this.#data,
        ...Manager.config.actions.delete.request.config,
      })
      .then(
        (resp) => {
          if (Manager.config.actions.delete.response.apply) {
            this.apply(resp);
          }
          return Manager.config.actions.delete.response.onSuccess(this, resp);
        },
        (err) => {
          return Manager.config.actions.delete.response.onError(this, err);
        }
      );
  }

  fetch() {
    return Model.axios
      .request<Model>({
        method: Manager.config.actions.fetch.request.method,
        url: Manager.config.actions.fetch.request.path(this),
        data: this.#data,
        ...Manager.config.actions.fetch.request.config,
      })
      .then(
        (resp) => {
          if (Manager.config.actions.fetch.response.apply) {
            this.apply(resp);
          }
          return Manager.config.actions.fetch.response.onSuccess(this, resp);
        },
        (err) => {
          return Manager.config.actions.fetch.response.onError(this, err);
        }
      );
  }

  get #data(): object {
    let data = {};
    for (const name in this.#fields) {
      if (Object.prototype.hasOwnProperty.call(this.fields, name)) {
        data[name] = this[name];
      }
    }
    return data;
  }

  edit() {
    this.#isEdit = true;
    this.#isSaved = false;
    this.#old = { ...this };
  }

  revert() {
    if (this.#old) {
      this.apply(this.#old);
      this.#old = undefined;
      if (this.#isSaved) {
        this.save();
      } else {
        this.#isEdit = false;
      }
    }
  }

  apply(data?: object) {
    this.#fields = {};
    this.fields().forEach((f) => {
      if (typeof f === "string") {
        f = new Field(f);
      }
      this.#fields[f.name] = f;
      f.register(this, data[f.name]);
    });
    if (!("id" in this.#fields)) {
      this.#fields["id"] = new Field("id").readonly();
    }
  }
}
