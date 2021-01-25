const path = require("path");

module.exports = function override(config) {
  return {
    ...config,

    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "@vkontakte/vkui": path.resolve(__dirname, "../VKUI"),
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      },
      plugins: [],
    },

    resolveLoader: {
      modules: [
        path.resolve(__dirname, "../VKUI/node_modules"),
        path.resolve(__dirname, "./node_modules"),
      ],
    },
  };
};
