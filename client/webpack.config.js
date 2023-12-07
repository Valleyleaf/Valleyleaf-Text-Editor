const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),
      //Above redirects to index.html on start.
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      //Above adds service worker. Make sure Service worker... works.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Text Editor',
        short_name: 'Just Text Editor',
        description: 'Just another text editor',
        background_color: '#225ca3',
        theme_color: '#225ac3',
        start_url: './',
        publicPath: './',
        // puts the icons into the asset folder under the dist folder
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
          //Above adds icons to cache
        ],
      }),
    ],
    //Module below ensures that our webpack finds and uses the proper files on dist creation. It bases the choices off the file extensions.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
