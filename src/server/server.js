const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

//react dom server 可以在服务端渲染组件，将编译后的React组件当做模板函数进行 ReactDOMServer.renderToString(element)
const ReactDOMServer = require('react-dom/server')
const ServerApp = require('../../dist/ServerApp.js').default
const AppString = ReactDOMServer.renderToString(ServerApp)

const htmlTemplate = fs.readFileSync(path.join(__dirname, '../client/index.html'), 'utf8')
// console.log(htmlTemplate)

const newHtmlTemplate = htmlTemplate.replace('<!-- app -->', AppString)

//为了客户端可以正常请求到bundle.js, 第一个参数是为了可以在server处理bundle.js的逻辑（需要在webpack config中配置 public）
app.use('/public', express.static(path.join(__dirname, '../../dist')))

console.log(newHtmlTemplate)

app.get('/', (req, res) => {
    res.send(newHtmlTemplate)
})

// console.log(ServerApp)
// console.log(AppString, 1)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server on port ${port}`))