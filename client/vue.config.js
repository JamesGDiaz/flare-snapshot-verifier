module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/general.sass"`
      },
      scss: {
        prependData: `@import "~@/styles/general.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Flare Airdrop Checker'
      return args
    })
  },
  outputDir: 'build',
  assetsDir: 'static'
}
