const express = require("express");
const app = new express();
const session = require("express-session");
// 使用ejs模版引擎
app.set("view engine","ejs");
//配置静态目录
app.use(express.static("public"));
//建立虚拟目录匹配上传图片的路由
app.use("/upload",express.static("upload"));
//配置session中间件
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*30},
    rolling:true
}));
//引入route模块
const admin  = require("./route/admin");
//加载admin模块
app.use("/admin",admin);

app.listen("3001","127.0.0.1");