const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
  entry: {
    index: './demo/jsx/index.jsx',
  },
  output: {
    filename: './demo/js/[name].js',
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      'package',
      'node_modules',
    ]
  },
  plugins: [
    // new UglifyJSPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: babelConfig
      },
    ]
  },
};
