module.exports = {
  entry: __dirname + '/../src',
  output: {
    path: __dirname + '/../static',
    filename: 'bundle.js'
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
}
