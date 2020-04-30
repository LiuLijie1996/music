let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let app = express();

//解析前端发送的post请求
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//如果前端通过axios发送的数据，这段必须写
//开放demo目录下的所有资源,自动将static目录下的index作为根路由
app.use(express.static('static'));

//连接数据库
mongoose.connect(
    'mongodb://localhost:27017/music',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('数据库连接成功');
}).catch(err => {
    console.log('数据库连接失败');
});

//跨域
app.all("*", function (req, res, next) {
    res.header({
        "Access-Control-Allow-Creadentials": true,
        "Access-Control-Allow-Origin": req.headers.origin || "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        "Content-Type": "application/jsonText; charset=utf-8"
    });

    if (req.method === "OPTIONS") {
        res.send(200)
    } else {
        next()
    }
});

app.use('/', require("./routers/index"));

app.listen(3001, function () {
    console.log('3001端口监听成功');
});