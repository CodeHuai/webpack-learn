const path = require('path')

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
        // type: 'asset'

        // 打包图片，并且图片有自己的地址，地址会被设置到img或者background中
        // 缺点：网络请求多
        // type: "asset/resource"，

        // 图片进行base64的转换，并且直接将编码后的源码放到打包后的js文件中
        // 缺点：造成js非常大，会造成js代码的下载和解析或者执行的时间过长
        // type: "asset/inline"

      //   合理的规范应该是：小一点的图片进行base64的设置，大一点的图片直接进行单独打包，形成url地址，单独对图片请求
      }
    ]
  }
}
