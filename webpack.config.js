let resolvePath = require('path').resolve.bind(undefined, __dirname);

let babelConfig = {
  presets: [
    [require.resolve('babel-preset-react')],
    [require.resolve('babel-preset-env'), {
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
      resolvePath('./node_modules'),
      resolvePath('./src/js'),
      'package',
      'node_modules',
    ]
  },
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
