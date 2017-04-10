module.exports = {
  entry: __dirname + '/../src/worker-search.js',
  output: {
    path: __dirname + '/../static',
    filename: 'worker-search.js'
  },
  devtool: 'source-maps'
}
