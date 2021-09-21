const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  watch: true,
  output: {
    path: path.resolve("./dist"),
    filename: "app.js",
  },
};
