var path = require('path');
var webpack = require('webpack');

var outPath = path.join(__dirname, './dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var isProduction = false; //process.argv.indexOf('-p') >= 0;

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    './src/index'
  ],
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[name].[hash:5].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '../../theme.config$': path.join(__dirname, 'semantic-themes/theme.config')
    }
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader",
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: './',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: !isProduction,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          ident: 'postcss',
          options: {
            sourceMap: !isProduction,
          }
        },
        {
          loader: "less-loader", // compiles Less to CSS
          options: {
            sourceMap: !isProduction,
            lessOptions: {
              javascriptEnabled: true,
            }
          }
        }]
    },
    // static assets
    { test: /\.html$/, use: 'html-loader' },
    { test: /\.png$/, use: 'url-loader?limit=10000' },
    // this rule handles images
    {
      test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
      use: 'file-loader?name=[name].[ext]?[hash]'
    },

    // the following 3 rules handle font extraction
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    },
    {
      test: /\.otf(\?.*)?$/,
      use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[hash].css',
      ignoreOrder: false,
    })
  ]
};
