import { Axios, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import Model, { ModelConstructor } from "./model";
import { Store } from "vuex";

export default interface Options {
  models: ModelConstructor[];
  axios?: Axios;
  config?: Config;
}

export interface ActionConfig {
  response: {
    onSuccess: (model: Model, resp: AxiosResponse) => Model;
    onError: (model: Model, err: any) => Model;
    apply: boolean;
  };
  request: {
    method: Method;
    path: (model: Model) => string;
    config: AxiosRequestConfig;
  };
}

export interface Config {
  actions: {
    save: ActionConfig;
    delete: ActionConfig;
    create: ActionConfig;
    fetch: ActionConfig;
  };
  key: string;
}
