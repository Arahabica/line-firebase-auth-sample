const title = 'line-firebase-auth-sample'
module.exports = {
  mode: 'spa',
  srcDir: 'app',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#'
    },
    title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    script: [
      { src: '/vconsole.min.js' },
      { src: 'https://static.line-scdn.net/liff/edge/2.1/sdk.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#546E7A' },

  plugins: [{ src: '@/plugins/firebase' }],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    analyze: true,
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isDev) {
        config.devtool = isClient ? 'eval-source-map' : 'inline-source-map'
      }
    }
  }
}

