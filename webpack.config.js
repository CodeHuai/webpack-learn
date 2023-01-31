const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: "abc.png"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 部分文件可能一个loader 不能处理完，所以这里的use是一个数组形式,并且使用的顺序是从后往前
        use: [
          // 这种方式没有得到一个单独的css文件，并且样式也没有进行压缩，需要实现这部分东西要搭配plugin进行实现
          {
            loader: 'style-loader'
          },
          {
            // 单纯的使用css-loader 样式不会生效，因为他只负责解析，但是不会将css加载到html页面上
            loader: 'css-loader'
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['autoprefixer']
          //     }
          //   }
          // }
          {
            loader: 'postcss-loader'
          }
        ]
      },
      // 处理less时候要注意less的版本
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: ['autoprefixer']
          //     }
          //   }
          // },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset',
        // 合理规范应该是：小一点的图片进行base64的设置，大一点的图片直接进行单独打包，形成url地址，单独对图片请求
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024
          }
        },
        generator: {
          // 这种写法会导致在多张图片的情况下，后面的图片会覆盖前面的图片，所以这里不会写死，而是采用占位符的方式
          // filename: 'example.png'
          // 占位符：name：原来的图片名称； ext：原来文件的拓展名，也就是原来是.jpg,name打包后还是.jpg; hash：webpack会生成一串hash值，hash:8表示只取前八位hash值
          // 但是这里也要注意，不同的文件目录下如果有同名的图片名称，最终也还是会导致name的覆盖，所以这里采用hash值
          filename: 'img/[name]_[hash:8][ext]'
        }

        // 打包图片，并且图片有自己的地址，地址会被设置到img或者background中
        // 缺点：网络请求多
        // type: "asset/resource"，

        // 图片进行base64的转换，并且直接将编码后的源码放到打包后的js文件中
        // 缺点：造成js非常大，会造成js代码的下载和解析或者执行的时间过长
        // type: "asset/inline"
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            // options: {
            //   plugins: ['@babel/plugin-transform-arrow-functions']
            // }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    // https://vue-loader.vuejs.org/zh/guide/#vue-cli
    new VueLoaderPlugin()
  ]
}
