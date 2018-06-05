const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const dist = 'dist';

module.exports = {
  entry: {
    progress: './progress/plugin.js',
  },

  output: {
    path: path.resolve(__dirname, dist),
    publicPath: dist,
    filename: 'progress.js',
    library: 'v-progress',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: [
            {
              test: /\.css$/,
              use: [
                'vue-style-loader',
                'css-loader'
              ],
            },
            {
              test: /\.scss$/,
              use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
              ],
            },
          ]
        }
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|svg|ttf)$/,
        loader: 'url-loader',
      },
    ]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },

  devtool: '#eval-source-map',

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, dist)),
  ],
};

module.exports.devtool = '#source-map'
module.exports.plugins = (module.exports.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: false
    }
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
])
