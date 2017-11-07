import path from 'path';
import webpack from 'webpack';

const prodVsDev = (prod, dev) => (process.env.NODE_ENV === 'production' ? prod : dev);

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    c_app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: prodVsDev('[name].[chunkHash].js', '[name].js'),
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'b_vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    // keeps the hashes unchanged when changing code in other chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'a_manifest',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  devtool: '#inline-source-map',
  devServer: {
    publicPath: '/assets', // webpack build files serving path
    contentBase: path.resolve(__dirname, 'web'), // mount dir content to server root path
    watchContentBase: false,
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    proxy: {
      '/api/v1': 'http://localhost:8085',
      '/login': 'http://localhost:8085',
    },
  },
};
