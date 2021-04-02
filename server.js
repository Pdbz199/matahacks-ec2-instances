const fs = require('fs')
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

app.use(require('koa-static')('./static'))

router.get('/', (res) => {
    res.set('Content-type', 'text/html')
    res.body = fs.createReadStream('./static/html/index.html')
    res.status = 200
})

router.get('/current-time', (res) => {
    res.body = { "time": Date.now() }
    res.status = 200
})

app.use(router.routes())
app.listen(3000)