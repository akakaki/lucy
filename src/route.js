const path = require('path')

const pageData = [
  { id: 'sign-in', label: '登入' },
  { id: 'sign-up', label: '註冊' },
  { id: 'forget-password-step-1', label: '忘記密碼-step-1' },
  { id: 'forget-password-step-2', label: '忘記密碼-step-2' },
 
  // { id: 'index', label: '首頁' },
  { id: 'index', label: '露西面試助理' },
  { id: 'notification', label: '通知' },
  { id: 'website', label: '徵才網站' },
  { id: 'dropdown', label: '職缺' },
  { id: 'dropdown-setup-1', label: '職缺-step-1' },
  { id: 'dropdown-setup-2', label: '職缺-step-2' },
  { id: 'dropdown-setup-3', label: '職缺-step-3' },
  { id: 'response', label: '面試者資料' },
  { id: 'plan', label: '方案' },
  // { id: '', label: '露西交流網' },
  { id: 'setting', label: '設定' },
  { id: 'record', label: '交易紀錄' },
  { id: 'user', label: '應徵頁面' },
  { id: 'user-setup-1', label: '應徵頁面-setup-1' },
  { id: 'user-setup-2', label: '應徵頁面-setup-2' },
  { id: '404', label: '404' },
]

const PAGE_LIST = []
const ENTRY_LIST = [
  path.resolve('src/css/common.scss'),
  // 'jquery/dist/jquery.min.js',
]

const BUILD_ENTRY_LIST = []

for (const item of pageData) {
  PAGE_LIST.push({
    path: path.resolve(`src/${item.id}.pug`),
    file: `${item.id}.html`,
    label: item.label
  })
  ENTRY_LIST.push(path.resolve(`src/${item.id}.pug`))
}

module.exports = {
  PAGE_LIST,
  ENTRY_LIST,
  BUILD_ENTRY_LIST,
}