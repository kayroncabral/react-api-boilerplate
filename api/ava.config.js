export default {
  files: ['**/*.spec.js'],
  require: ['@babel/register', '@babel/polyfill'],
  babel: {
    extensions: ['js', 'jsx'],
    testOptions: {
      babelrc: true
    }
  }
}
