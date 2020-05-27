const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  entry: './server/index.ts',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js',

    // Bundle absolute resource paths in the source-map,
    // so VSCode can match the source file.
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          allowTsInNodeModules: true,
          configFile: 'server.tsconfig.json'
        },
      }
    ]
  },

  devtool: 'source-map',

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};

const clientConfig = {
  entry: './server/entry.ts',

  target: 'web',

  output: {
    path: path.resolve('server-build'),
    filename: 'entry.js',

    // Bundle absolute resource paths in the source-map,
    // so VSCode can match the source file.
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          allowTsInNodeModules: true,
          configFile: 'server.tsconfig.json'
        },
      }
    ]
  },

  devtool: 'source-map',

  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};

module.exports = [serverConfig, clientConfig];