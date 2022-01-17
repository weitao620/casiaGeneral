
module.exports = {
  outputDir: 'web',
  assetsDir: 'static',
  devServer: {
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    port: 8088,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://10.0.6.89:6120',
        // target: "http://172.18.40.12",
        // target: "http://119.90.45.121:16666",
        // target: 'https://ipathy.net',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/api/': ''
        }
      }
    }
  },
  productionSourceMap: false,
  // chainWebpack: config => {
  //   config.plugin('provide').use(webpack.ProvidePlugin, [{
  //     $: 'jquery',
  //     jquery: 'jquery',
  //     jQuery: 'jquery',
  //     'window.jQuery': 'jquery'
  //   }])
  // },
  css: {
    // loaderOptions: {
    //   css: {},
    //   postcss: {
    //     plugins: [
    //       require('postcss-px2rem')({
    //         remUnit: 192
    //       })
    //     ]
    //   }
    // }
  },
  configureWebpack: {
    externals: {
      './cptable': 'var cptable'
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
