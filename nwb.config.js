module.exports = {
  type: 'web-module',
  babel: {
    presets: 'env'
  },
  npm: {
    esModules: true,
    umd: {
      global: 'neural',
      externals: {
        'mermaid': 'mermaid'
      }
    }
  }
}
