let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let path = require('path');
let resolvePath = path.resolve.bind(undefined, __dirname);

let nodeEnv = process.env.NODE_ENV;
let isProduction = nodeEnv === `"production"`;

let babelConfig = {
  presets: [
    ['babel-preset-react'],
    ['babel-preset-env', {
      targets: { browser: [`last 2 versions`] },
      modules: false,
      loose: true,
    }],
  ],
  plugins: [
    'transform-object-rest-spread'
  ]
};

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    index: './demo/jsx/index.jsx',
  },
  output: {
    filename: './demo/js/[name].js',
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      resolvePath('./node_modules'),
      resolvePath('./package'),
      'node_modules',
    ]
  },
  plugins: isProduction? [
    new UglifyJSPlugin()
  ] : [],
  module: {
    loaders: [
      {
        enforce: "pre",
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: babelConfig
      },
    ]
  },
};
