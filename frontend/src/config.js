const dev = process.env.NODE_ENV !== 'production'

const location = dev ? '/' : '/ihauke/'

export default {
  dev: dev,
  location: location,
  api: {
    scheme: window.location.protocol.slice(0, -1),
    host: dev ? (window.location.host.slice(0, -1) + '1') : window.location.host,
    basePath: location + 'v1'
  }
}
