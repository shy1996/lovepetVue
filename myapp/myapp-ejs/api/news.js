var express = require('express');
var router = express.Router();
var url = require('url');
var multer = require("multer");
var upload = multer({dest:"upload/"});
var fs = require("fs");

var mysql = require("./tool/mysql")

/* GET users listing. */
var isLogin = 0;
router.get('/', function(req, res, next) {
    //if(req.cookies.isLogin == 1) {
        var pageCode = url.parse(req.url, true).query.pageCode * 1;
        var limitNum = url.parse(req.url, true).query.limitNum * 1;
        var newID = url.parse(req.url, true).query.newID;
        mysql.connect(function(db){
            if(newID){
                var  queryObj = {newID:newID}
            }else{
                var queryObj = {}
            }
            var showObj = {
                _id: 0,

            };
            var skipNum = limitNum * (pageCode  - 1);

            //先查找出所有的数据
            mysql.find(db, "news", queryObj, showObj, (resultAll) => {
                console.log(resultAll);
                //console.log(result);
                var obj = {
                    title: "爱在小窝",
                    activeIndex: 4,
                    isBoss: false,
                    result:resultAll,
                };
                //从所有数据中进行分页
                mysql.findFenye(db, "news", queryObj, showObj, limitNum, skipNum, pageCode, (result) => {
                    var totalPages = Math.ceil(resultAll.length / limitNum);//总页数
                    var obj = {
                        title: "爱在小窝",
                        activeIndex: 4,
                        isBoss: false,
                        result: result,
                        allNum: resultAll.length,
                        pageCode: pageCode,
                        totalPages: totalPages
                    };
                    res.render("news", obj);
                    //res.send(resultAll);
                    db.close();
                });
                res.send(resultAll)
            });
        });
   /* }else{
        res.render("login", {title:"登录",errInfo:""});
    }*/

});


module.exports = router;
