const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
    signIn: path.resolve(__dirname, './src/signIn.js'),
    signUp: path.resolve(__dirname, './src/signUp.js'),
    chatEmojis: path.resolve(__dirname, './src/helpers/chat&emojis.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // Images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './dist'),
    open: true,
    compress: true,
    // hot: true,
    // liveReload: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/template.html'), // template file
      filename: 'index.html', // output file
      chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/SignIn.html'), // template file
      filename: 'SignIn.html', // output file
      chunks: ['signIn'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/SignUp.html'), // template file
      filename: 'SignUp.html', // output file
      chunks: ['signUp'],
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}