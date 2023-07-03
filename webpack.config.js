const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV ?? 'production',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
