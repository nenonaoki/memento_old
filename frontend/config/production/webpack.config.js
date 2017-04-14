const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: {
    components: './src/javascripts/components.js',
  },
  output: {
    path: '../app/assets/javascripts',
    filename: '[name].js'
  },
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
