const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtraneousFileCleanupPlugin = require('webpack-extraneous-file-cleanup-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const dist = 'public';

module.exports = {
  entry: {
    bundle: './test/src/main.js',
  },

  output: {
    filename: 'bundle/[name].js',
    path: path.resolve(__dirname, dist),
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

  devServer: {
    index: 'index.html',
    contentBase: dist,
    noInfo: true,
    overlay: false,
    historyApiFallback: true,
  },

  devtool: '#eval-source-map',

  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, dist)),

    new HtmlWebpackExcludeAssetsPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './test/src/index.pug',
      excludeAssets: [/.js/, /.css/],
    }),

    new ExtraneousFileCleanupPlugin({
      extensions: ['.js'],
      paths: ['/bundle'],
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
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
} else {
  module.exports.module.rules = (module.exports.module.rules || []).concat([
    {
      enforce: "pre",
      test: /\.(js|vue)$/,
      exclude: /node_modules|dist/,
      loader: "eslint-loader",
      options: {
        formater: require('eslint-friendly-formatter'),
      }
    }
  ])
}
