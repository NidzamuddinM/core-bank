const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

const isProd = process.env.NODE_ENV === "production";
const REMOTE1_URL = process.env.REMOTE1_URL || (isProd ? "/remote1" : "http://localhost:3001");
const REMOTE2_URL = process.env.REMOTE2_URL || (isProd ? "/remote2" : "http://localhost:3002");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    publicPath: "auto",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        remote1: `remote1@${REMOTE1_URL}/remoteEntry.js`,
        remote2: `remote2@${REMOTE2_URL}/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true,
        },
        "styled-components": {
          singleton: true,
          requiredVersion: deps["styled-components"],
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
