module.exports = {
  lang: "en-US",
  title: "Vue Model Manager",
  description: "This is my first VuePress site",

  themeConfig: {
    logo: "https://vuejs.org/images/logo.png",
    // navbar: [
    //   {
    //     text: "Guide",
    //     link: "",
    //   },
    //   {
    //     text: "API",
    //   },
    //   {
    //     text: "Changelog",
    //   },
    //   // {
    //   //   text: "GitHub",
    //   //   link: "https://github.com/deveox/vue-model-manager",
    //   // },
    // ],
    sidebar: {
      "/guide/": [
        "/guide/README.md",
        "/guide/getting-started.md",
        "/guide/configuration.md",
        "/guide/model",
      ],
      "/api/": [{ text: "Model" }, { text: "Field" }, { text: "Validator" }],
    },
  },
};
