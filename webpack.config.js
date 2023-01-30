const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          }
        ]
      },
      // 处理less时候要注意less的版本
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  }
}