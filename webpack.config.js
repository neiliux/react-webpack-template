var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var _root = path.resolve(__dirname, '.');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

module.exports = {
  entry: {
    'polyfills': './src/polyfills.js',
    'vendor': './src/vendor.js',
    'app': './src/main.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
  resolveLoader: {
     modules: [ 'node_modules' ]
  },
  output: {
    path: root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
        {
            include: __dirname,
            exclude: /node_modules/,
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['react'] }
            }]
        },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        include: root('./src', 'assets'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?sourceMap' })
      },
      {
        test: /\.scss$/,
        include: root('./src', 'assets'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?sourceMap', 'sass-loader?sourceMap']})
      },
      {
        test: /\.css$/,
        exclude: root('./src', 'assets'),
        loader: ['css-to-string-loader','css-loader']
    },
    {
      test: /\.scss$/,
      exclude: root('./src', 'assets'),
      loader: ['raw-loader','sass-loader']
    }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
