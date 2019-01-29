/*
登录相关
 */
const express = require("express");
const router = express.Router();
const md5 = require("md5-node");
const DB = require("../../module/db");
const bodyParse = require("body-parser");
// 设置bodyParser的中间件间件
router.use(bodyParse.urlencoded({extended:false}));
router.use(bodyParse.json());
router.get("/",function (req,res) {
    res.render("admin/login");
});
router.post("/doLogin",function (req,res) {
//利用bodyParser 获取表单提交的数据
    const param = req.body;
    const pas = md5(param.password);
    DB.find("user",
        {"username":param.username,"password":pas},
        function(err,data){
            if(err){
                return;
            }
            if(data&&data.length>0){
                //保存用户信息，用于权限控制;后台一般使用session来保存用户信息
                req.session.userInfo = data[0];
                //跳转到product页面
                res.redirect("/admin/product");
            }else{
                res.send("<script>alert('登录失败');location.href='/admin/login';</script>");
            }
        });
});
router.get("/logout",function (req,res) {
    req.session.destroy(function (err) {
        if(err){

        }else{
            res.redirect("/admin/login");
        }
    });
});
module.exports = router;