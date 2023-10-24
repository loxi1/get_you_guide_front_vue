module.exports = {
  runtimeCompiler: true,
  lintOnSave : true,
  devServer: {
    proxy: 'http://localhost:8080',
    disableHostCheck: true,
  }/**/
}