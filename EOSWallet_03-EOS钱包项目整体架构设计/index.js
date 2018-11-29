
//let声明变量，词法作用域
//node全局安装的包不能直接在js文件中用require获得，因为require不会搜索/usr/local/lib/node_modules/路径。
//而本地安装可以直接通过require()的方式引入
let koa = require("koa")
//通过koa创建一个应用程序
let app = new koa()
//导入./router/route这个包，赋值给的router就是 ./router/router导出的数据
let router = require("./router/router")
let static = require("koa-static")
let path = require("path")
let views = require("koa-views")
let koaBody = require("koa-body")

//对于任何请求，koa将调用该异步函数处理请求：
//ctx由koa传入，封装了request和response，可通过它访问request和response；next是koa传入的将要处理的下一个异步函数。
//由async标记的函数称为异步函数
app.use(async (ctx, next) => {
    console.log(`${ctx.method} ${ctx.url} ..........`)
    //处理下一个异步函数
    await next()
})

//针对于文件上传的时候，可以解析多个字段
app.use(koaBody({multipart:true}))
//注册静态文件的库到中间件
app.use(static(path.join(__dirname, "static")))
//注册模板引擎的库到中间件
app.use(views(path.join(__dirname, "views"), {extension:"ejs", map:{html:"ejs"}}))
app.use(router.routes())
  
console.log("正在监听3000端口")
app.listen(3000)
