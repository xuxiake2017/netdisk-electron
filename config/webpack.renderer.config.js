const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    bundle: ['./index.ts'],
    // main: ['./main.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    // clean: true,
    // publicPath: '/dist/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV !== 'production'
          ? 'style-loader'
          : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // 更多信息请点击这里 https://webpack.js.org/guides/asset-modules/
        type: "asset",
        generator: {
          filename: '[hash][ext][query]'
        }
      },
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
    }),
    new MiniCssExtractPlugin({
      // 与 webpackOptions.output 中的选项相似
      // 所有的选项都是可选的
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    require('unplugin-element-plus/webpack')({
      // options
    }),
  ],
  target: 'electron-renderer'
}