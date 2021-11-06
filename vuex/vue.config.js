module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/app'
    : '',
  pages: {
    index: {
      title: 'Todo Applicaiton',
      entry: '/src/main.js'
    },
    landing: {
      title: 'Landing Page',
      entry: '/src/landing.js'
    }
  }
}
