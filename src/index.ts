import Model, { ModelConstructor } from "./model";
import Options, { Config } from "./options";
import utils from "./utils";
import defaults from "./defaults";
import { App } from "vue";
export interface QueryParams {
  offset: string;
  limit: string;
  [name: string]: string;
}
export default class Manager {
  static config: Config;
  static utils = utils;
  #definitions: Map<string, ModelConstructor>;

  constructor(app?: App, options: Options = {} as Options) {
    Manager.config = Manager.utils.deepMerge<Config>(options.config, defaults);
    this.#definitions = new Map();
    options.models.forEach((m) => {
      console.log(m.name, m);
      if (this.has(m.name)) {
        throw new Error(
          `Model '${m.name}' is already registered. Seems like you have same model name for several models.`
        );
      }
      this.#definitions.set(m.name, m);
    });
    if (app) {
      app.config.globalProperties[`$${Manager.config.key}`] = this;
    }
  }

  #new(modelName: string, modelData?: object): Model {
    return new (this.#definitions.get(modelName))(modelData);
  }

  has(modelName: string) {
    return this.#definitions.has(modelName);
  }

  new(modelName: string, modelData?: object): Model {
    if (!this.has(modelName)) {
      throw new Error(
        `Can't create new instance of '${modelName}'. Model wasn't registered.`
      );
    }
    return this.#new(modelName, modelData);
  }

  newCollection(modelName: string, ...modelData: object[]): Model[] {
    if (!this.has(modelName)) {
      throw new Error(
        `Can't create new instance of '${modelName}'. Model wasn't registered.`
      );
    }
    let arr: Model[] = [];
    modelData.forEach((d) => {
      arr.push(this.#new(modelName, d));
    });
    return arr;
  }
}
