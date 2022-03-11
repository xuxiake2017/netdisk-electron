const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    // bundle: ['./index.js'],
    main: ['./main.ts'],
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
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ]
      // },
      // {
      //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      //   // 更多信息请点击这里 https://webpack.js.org/guides/asset-modules/
      //   type: "asset",
      //   generator: {
      //     filename: '[hash][ext][query]'
      //   }
      // },
      {
        test: /\.ts$/,
        loader: "ts-loader",
      }
    ]
  },
  // plugins: [
  //   // 请确保引入这个插件！
  //   new VueLoaderPlugin(),
  // ],
  target: 'electron-main'
}