const path = require("path");

module.exports = {
  // ... other configurations ...
  entry: "./src/index",
  mode: "development",
  devtool: "hidden-source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
