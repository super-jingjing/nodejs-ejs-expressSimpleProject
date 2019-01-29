const express = require("express");
const router = express.Router();
//相当于后台的路由，所有的后台处理都需要从这里经过
router.use(function (req,res,next) {
    const currPath = req.url;
    if(currPath=="/login" || currPath=="/login/doLogin"){
        next();
    }else{
        if(req.session.userInfo && req.session.userInfo.username && req.session.userInfo.username!=""){
            //ejs中 设置全局数据 所有的页面都可以使用  在ejs中直接<%=userInfo%>
            req.app.locals["userInfo"] = req.session.userInfo.username;
            //如果已经登录，继续执行
            next();
        }else{
            //如果未登录，重定向回去
            res.redirect("/admin/login");
        }
    }
});
const login = require("./admin/login");
const user = require("./admin/user");
const product = require("./admin/product");

//admin/login
router.use("/login",login);
router.use("/user",user);
router.use("/product",product);


module.exports = router;