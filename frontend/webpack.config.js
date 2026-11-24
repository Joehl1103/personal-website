import fs from "node:fs";
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = import.meta.dirname;

function copyBlogAssets() {
  return {
    apply(compiler) {
      const { Compilation, sources } = compiler.webpack;
      compiler.hooks.thisCompilation.tap("CopyBlogAssets", (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: "CopyBlogAssets",
            stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          },
          () => {
            const dir = path.resolve(__dirname, "src/content/blog/assets");
            for (const name of fs.readdirSync(dir)) {
              if (!/\.(png|jpe?g|gif|svg)$/i.test(name)) continue;
              compilation.emitAsset(
                `blog/assets/${name}`,
                new sources.RawSource(fs.readFileSync(path.join(dir, name)))
              );
            }
          }
        );
      });
    },
  };
}

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
    copyBlogAssets(),
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
