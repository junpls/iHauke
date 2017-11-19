const dev = process.env.NODE_ENV !== 'production'

export default {
  dev: dev,
  api: {
    scheme: window.location.protocol.slice(0, -1),
    host: dev ? (window.location.host.slice(0, -1) + '1') : window.location.host,
    basePath: '/v1'
  }
}
