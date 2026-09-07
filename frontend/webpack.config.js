import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = import.meta.dirname;
console.log(path.resolve(__dirname, "dist"));

export default {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: path.join(__dirname),
    compress: true,
    port: 5001,
    historyApiFallback: true,
    hot: true,
  },
};
