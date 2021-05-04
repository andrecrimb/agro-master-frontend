const { createProxyMiddleware } = require('http-proxy-middleware')

const TARGET = 'http://localhost:8080/'

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: TARGET,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      preserveHeaderKeyCase: true
    })
  )
}
