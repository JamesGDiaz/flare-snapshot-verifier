module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "~@/styles/general.sass"`
        },
        scss: {
          prependData: `@import "~@/styles/general.scss";`
        },
      }
    }
  }