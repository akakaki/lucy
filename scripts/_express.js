const express = require('express')
const app = express()
const fs = require('fs')
// const path = require('path')

app.set('port', 3000)
app.set('views', 'src')
app.set('view engine', 'pug')

const init = async () => {
  const list = await new Promise ((resolve) => {
    fs.readdir('src', function (err, files) {
      resolve(files)
    })
  })

  for (const item of list) {
    // app.get('/', function (req, res) {
    //   res.render('index')
    // })
  }

  // app.listen(app.get('port'), function () {
  //   console.log(`uriko - http://localhost:${app.get('port')}/`)
  // })
}

init()


app.get('/', function (req, res) {
  res.render('index')
})

app.listen(app.get('port'), function () {
  console.log(`uriko - http://localhost:${app.get('port')}/`)
})

//https://www.npmjs.com/package/webpack-node-externals
// nodemon