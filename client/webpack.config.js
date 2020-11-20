var path = require('path');
var webpack = require('webpack');

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
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
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
          query: {
            modules: true,
            sourceMap: !isProduction,
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            sourceMap: !isProduction,
            postcssOptions: {
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('postcss-cssnext')(),
                require('postcss-reporter')(),
                require('postcss-browser-reporter')({
                  disabled: isProduction
                })
              ]
            }
          }
        },
        {
          loader: "less-loader", // compiles Less to CSS
          options: {
            sourceMap: !isProduction,
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
