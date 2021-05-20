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
  app.use(
    createProxyMiddleware('/ws', {
      target: 'https://viacep.com.br/',
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      preserveHeaderKeyCase: true
    })
  )
}
