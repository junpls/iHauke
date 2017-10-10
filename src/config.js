export default {
  api: {
    scheme: window.location.protocol.slice(0, -1),
    host: window.location.host.slice(0, -1) + '1',
    basePath: '/v1'
  }
}
