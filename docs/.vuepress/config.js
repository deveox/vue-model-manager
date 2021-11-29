module.exports = {
  lang: "en-US",
  title: "Vue Model Manager",
  description: "This is my first VuePress site",

  themeConfig: {
    logo: "https://vuejs.org/images/logo.png",
    navbar: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "API",
        link: "/api/",
      },
      {
        text: "GitHub",
        link: "https://github.com/deveox/vue-model-manager",
      },
    ],
    sidebar: {
      "/guide/": [
        "/guide/README.md",
        "/guide/getting-started.md",
        "/guide/configuration.md",
        "/guide/model",
        "/guide/field",
        "/guide/validation",
      ],
      "/api/": [{ text: "Model" }, { text: "Field" }, { text: "Validator" }],
    },
  },
};
