const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./public/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/": "http://localhost:3000/",
    },
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};

//This tells webpack to use babel-loader to transpile your JavaScript code.
//The module key is an object that specifies how to handle different
//types of modules. The rules array contains an object that
//specifies how to handle .js files. The test property specifies
//a regular expression that matches .js files, the exclude property
//specifies a regular expression that excludes the node_modules
//directory, and the use property specifies that we want to use
// babel-loader with the @babel/preset-env and @babel/preset-react
// presets.
