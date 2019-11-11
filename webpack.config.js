 const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const WebpackMerge = require('webpack-merge');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独分离打包css
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除文件
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development'
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
const config = { 
  target: 'web',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'api': resolve('src/api'),
      'service':  resolve('src/service'),
      'components':  resolve('src/components')
    }
  },
  module: {
    rules: [
      // vue文件处理
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // .jsx文件处理
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // js文件处理
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // css文件处理
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              publicPath: '../'
            }
          },
          'css-loader',
        ]
      },
      // stylus文件处理
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              publicPath: '../'
            }
          },
          'css-loader',
          'stylus-loader'
        ],
        include:[resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name].[hash:5].[ext]',
            outputPath: 'img'
          }
        }]
      },
      // 字体图标的配置
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
  },
  devServer:{
    port: 8000,
    proxy: {        
       '/api': {
            target: 'http://test.happymmall.com',
            changeOrigin: true,   //允许跨域
            pathRewrite: {
              '^/api': ''
            }
        }
    }
  },
  optimization:{
    // minimize: true,
    runtimeChunk:{
      name:'manifest'
    },
    splitChunks: {
      chunks: 'async', //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      minSize: 30000, // 合并模块文件的体积
      minChunks: 1, //最少被引用次数
      cacheGroups: {
        vendors: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new VueLoaderPlugin()
  ]
}
if(!isDev){
  config.plugins.push(new CleanWebpackPlugin(['dist']))
}
module.exports = config;