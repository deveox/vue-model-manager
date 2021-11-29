import { Config } from "./options";

export default {
  key: "mm",
  actions: {
    create: {
      request: {
        method: "POST",
        path: (m) => `/${m.baseRoute}/`,
        config: {},
      },
      response: {
        apply: true,
        onSuccess: (m) => m,
        onError: (m, err) => {
          console.log(err);
          return m;
        },
      },
    },
    save: {
      request: {
        method: "PATCH",
        path: (m) => `/${m.baseRoute}/${m.id}/`,
        config: {},
      },
      response: {
        apply: true,
        onSuccess: (m) => m,
        onError: (m, err) => {
          console.log(err);
          return m;
        },
      },
    },
    delete: {
      request: {
        method: "DELETE",
        path: (m) => `/${m.baseRoute}/${m.id}/`,
        config: {},
      },
      response: {
        apply: false,
        onSuccess: (m) => m,
        onError: (m, err) => {
          console.log(err);
          return m;
        },
      },
    },
    fetch: {
      request: {
        method: "GET",
        path: (m) => `/${m.baseRoute}/${m.id}/`,
        config: {},
      },
      response: {
        apply: true,
        onSuccess: (m) => m,
        onError: (m, err) => {
          console.log(err);
          return m;
        },
      },
    },
  },
} as Config;
