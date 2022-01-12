const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new WebpackPwaManifest({
      name: 'Restaurant Catalog',
      short_name: 'Restaurant Lite',
      description: 'Free Catalogue Restaurant for you',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#d84315',
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-72.png'),
          sizes: '72x73',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-96.png'),
          sizes: '96x96',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-128.png'),
          sizes: '128x128',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-144.png'),
          sizes: '144x144',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-152.png'),
          sizes: '152x152',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-192.png'),
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-384.png'),
          sizes: '384x384',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: path.resolve(__dirname, 'src/public/icons/icon-512.png'),
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: 'sw.js',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
      ],
    }),
  ],
};


