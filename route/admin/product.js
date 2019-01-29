const express = require("express");
const router = express.Router();
const DB = require("../../module/db");
const multiparty = require("multiparty");
const fs = require("fs");
router.get("/",function (req,res) {
    DB.find("product",
        {},
        function(err,data){
            if (err) {
                console.log(error);
                return;
            }
            res.render("admin/product/index",{list:data});
        });
});
router.get("/add",function (req,res) {
    res.render("admin/product/productadd");
});
router.post("/doAdd",function (req,res) {
    const form = new multiparty.Form();
    //上传图片保存的地址
    form.uploadDir = "upload";
    //files 图片上传成功返回的地址信息   fields获取的表单数据
    form.parse(req,function(err,fields,files){
        //获取提交的数据以及图片上传成功返回的图片信息
        const title = fields.title[0];
        const price = fields.price[0];
        const description = fields.description[0];
        const fee = fields.fee[0];
        const pic = files.pic[0].path;
        console.log(pic);
        DB.insert("product",{
            title,price,description,fee,pic
        },function(error,data){
            if(error){
                console.log(error);
                return;
            }
            res.redirect("/admin/product");
        });

    });
});
router.get("/edit",function (req,res) {
    const id = req.query.id;
    DB.find("product",
        {_id:new DB.ObjectID(id)},
        function(err,data){
            if (err) {
                console.log(error);
                return;
            }
            res.render("admin/product/productedit",{item:data[0]});
        });
});
router.post("/doEdit",function (req,res) {
    const form = new multiparty.Form();
    form.uploadDir = "upload";
    form.parse(req,function(err,fields,files){
        const _id = fields._id[0];
        const title = fields.title[0];
        const price = fields.price[0];
        const description = fields.description[0];
        const fee = fields.fee[0];
        const originalFilename =  files.pic[0].originalFilename;
        const pic = files.pic[0].path;
        let updataJson = {};
        // originalFilename有值  -- 有修改图片
        // originalFilename无值  -- 未修改图片
        if(originalFilename){
            updataJson = {title,price,description,fee,pic};
        }else{
            //未修改图片
            updataJson = {title,price,description,fee};
            //删除生成的临时文件
            fs.unlink(pic);
        }

        DB.update("product",{
            _id:new DB.ObjectID(_id)
        },updataJson,function(error,data){
            if(error){
                console.log(error);
                return;
            }
            res.redirect("/admin/product");
        });
    });
});
router.get("/delete",function (req,res) {
    const id = req.query.id;
    DB.delete("product",
        {_id:new DB.ObjectID(id)},
        function(err,data){
            if (err) {
                console.log(error);
                return;
            }
            res.redirect("/admin/product");
        });
});
module.exports = router;