const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{loader: "ts-loader", options: {onlyCompileBundledFiles: true}}],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.min.js",
    path: path.resolve(__dirname, "lib"),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
