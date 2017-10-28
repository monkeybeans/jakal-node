import path from 'path';
import webpack from 'webpack';

const prodVsDev = (prod, dev) => (process.env.NODE_ENV === 'production' ? prod : dev);

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    'c_app-jakal': './src/index.js',
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
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader?importLoaders=1',
      //     'postcss-loader',
      //     'sass-loader',
      //   ],
      // },
    ],
  },
  devtool: '#inline-source-map',
  devServer: {
    publicPath: '/jakal/dist', // webpack build files serving path
    contentBase: path.resolve(__dirname, 'src/web'), // static content
    watchContentBase: false,
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    proxy: {
      '/api/v1': 'http://localhost:8085',
    },
  },
};
