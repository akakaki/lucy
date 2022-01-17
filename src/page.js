const path = require('path')

const PAGE_LIST = [
  { path: path.resolve('src/login.pug'), file: 'login.html' },
  // { path: path.resolve('src/sign.pug'), file: 'sign.html' },
  // { path: path.resolve('src/sign-up.pug'), file: 'sign-up.html' },
  // { path: path.resolve('src/forget-pass.pug'), file: 'forget-pass.html' },

  // { path: path.resolve('src/index.pug'), file: 'index.html' },
  // { path: path.resolve('src/about.pug'), file: 'about.html' },
]

const ENTRY_LIST = [
  path.resolve('src/login.pug'),
  // path.resolve('src/index.pug'),
  // path.resolve('src/about.pug'),
  path.resolve('src/css/common.scss'),
  // 'jquery/dist/jquery.min.js',
]

module.exports = {
  PAGE_LIST,
  ENTRY_LIST,
}