let express = require('express')
let app = express()
let path = require('path')
let bodyParser = require('body-parser')
let router = require('./router')
let session = require('express-session')

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
app.set('views',path.join(__dirname,'./views/'))
app.engine('html',require('express-art-template'))

//配置post请求读取数据
app.use(bodyParser.urlencoded({extends: false}))
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(router)

app.listen(3000, function () {
  console.log('服务器启动');
})