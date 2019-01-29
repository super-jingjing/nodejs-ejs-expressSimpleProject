const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbUrl = "mongodb://127.0.0.1:27017/";
exports.ObjectID = ObjectID;
function _connectDB(callback){
    MongoClient.connect(dbUrl,function(err,db){
        if(err){
            console.log("数据库链接失败");
            return;
        }
        var dbo = db.db("productmanage");
        callback(err,dbo);
        db.close();
    });
}
//查询数据
exports.find = function(collectionName,json,callback){
    _connectDB(function(err,dbo){
        if(err){
            console.log(err);
            return;
        }
        const result = dbo.collection(collectionName).find(json);
        result.toArray(function (error,data) {
            callback(error,data);
        });
    });
}
//新增数据
exports.insert = function(collectionName,json,callback){
    _connectDB(function(err,dbo){
        if(err){
            console.log(err);
            return;
        }
        dbo.collection(collectionName).insertOne(json,function (error,data) {
            callback(error,data);
        });
    });
}
//修改数据
exports.update = function(collectionName,json1,json2,callback){
    _connectDB(function(err,dbo){
        if(err){
            console.log(err);
            return;
        }
        dbo.collection(collectionName).updateOne(json1,{$set:json2},function(error,data) {
            callback(error,data);
        });
    });
}
//删除数据
exports.delete = function(collectionName,json,callback){
    _connectDB(function(err,dbo){
        if(err){
            console.log(err);
            return;
        }
        dbo.collection(collectionName).deleteOne(json,function(error,data) {
            callback(error,data);
        });
    });
}
