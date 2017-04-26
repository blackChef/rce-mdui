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
    index: './demo/index.jsx',
  },
  output: {
    filename: './demo/[name].js',
  },
  resolve: {
    extensions: [".js", ".jsx"],
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
