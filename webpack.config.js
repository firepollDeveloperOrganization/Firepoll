const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: {
    managementClient: ["babel-polyfill", `${SRC_DIR}/managementClientIndex.jsx`],
    responseClient: ["babel-polyfill", `${SRC_DIR}/responseClientIndex.jsx`]
  },
  optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true
        })
      ]
    , splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        managementClient: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        responseClient: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CompressionPlugin()
  ],
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR,
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-2'],
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'css-loader',
          'sass-loader',
          'style-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      },
    ],
  },
};
