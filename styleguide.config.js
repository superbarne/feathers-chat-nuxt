const path = require('path')

module.exports = {
  components: 'client/components/**/*.vue',
  mixins: [
    'client/plugins/moment'
  ],
  webpackConfig: {
    module: {
      rules: [
        // Vue loader
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader?precision=10']
        }
      ]
    }
  },
  getExampleFilename (componentPath) {
    return componentPath.replace('.vue', '.md')
  },
  require: [
    'babel-polyfill',
    path.join(__dirname, 'client/assets/scss/main.scss')
  ]
}
