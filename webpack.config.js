const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/openmrs-esm-home.tsx"),
  output: {
    filename: "openmrs-esm-home.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        parser: {
          system: false
        }
      },
      {
        test: /\.m?(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  devtool: "sourcemap",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    disableHostCheck: true
  },
  externals: [
    "react",
    "react-dom",
    "react-router",
    "react-router-dom",
    "single-spa-react",
    /^@openmrs\//
  ],
  plugins: [new ForkTsCheckerWebpackPlugin(), new CleanWebpackPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  }
};
