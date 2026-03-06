const path = require("path");

module.exports = function (currentWebpackConfig) {
  return {
    ...currentWebpackConfig,
    resolve: {
      ...currentWebpackConfig.resolve,
      alias: {
        ...currentWebpackConfig.resolve?.alias,
        '@': path.join(process.cwd(), './'),
      },
    },
  };
};
