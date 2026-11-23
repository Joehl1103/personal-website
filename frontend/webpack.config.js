import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = import.meta.dirname;

export default {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
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
      {
        test: /\.md$/i,
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.css$/i,
        use: ["style-loader","css-loader"]
      }
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
