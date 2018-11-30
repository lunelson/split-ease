var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/split-ease.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'split-ease.min.js',
    library: 'SplitEase',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
