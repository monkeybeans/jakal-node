import path from 'path';
// import webpack from 'webpack';

const prodVsDev = (prod, dev) => (process.env.NODE_ENV === 'production' ? prod : dev);

const shared = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
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
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    },
  ],
};

const browser = {
  resolve: shared.resolve,
  module: { rules: shared.rules },

  entry: {
    browser: path.resolve(__dirname, './src/application.js'),
  },

  output: {
    path: path.resolve(__dirname, '../../dist/static'),
    // filename: '[name].[hash].js',
    filename: '[name].bundle.js',
  },
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
  //   }),
  //   // keeps the hashes unchanged when changing code in other chunk
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'manifest',
  //   }),
  // ],
  devtool: prodVsDev(false, '#inline-source-map'),
};

// const server =   {
//   name: "server",
//
//   resolve: shared.resolve,
//   module: { rules: shared.rules },
//
//   target: 'node',
//
//   entry: {
//     server: path.resolve(__dirname, './lib/server/src/index.js'),
//   },
//
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].js',
//     libraryTarget: "commonjs2",
//   },
// };

module.exports = [
  browser,
  // server,
];
