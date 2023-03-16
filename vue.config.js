/**
 * @author : lijiesheng
 * @date : 2023/3/16 2:25 下午
 * @description :
 */
module.exports = {
  devServer: {
    // host: '0.0.0.0',
    host: '101.42.97.221',
    port: 8080,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      'downloadUrl/': {
        // target: `http://43.142.136.148:8080`,
        target: `https://d.pcs.baidu.com/`,
        changeOrigin: true,
        pathRewrite: {
          ['^']: ''
        }
      }
    },
  }
}
