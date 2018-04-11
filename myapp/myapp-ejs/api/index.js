var express = require('express');
var router = express.Router();
var mysql = require("./tool/mysql");
var url = require("url");

var isLogin = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
    //if(req.cookies.isLogin == 1) {
        mysql.connect((db) => {
            var queryObj = {};
            var showObj = {
                _id:0
            };
            mysql.find(db, "user", queryObj, showObj, (result)=>{
                //res.render("index", {title:'爱在小窝', activeIndex: 0, isBoss: false, result:result});
                res.send(result);
                db.close();
            }) ;
        });
   /* }else{
        res.render("login", {title:"登录",errInfo:""});
    }*/

});

//nav导航
router.get("/nav", function (req, res, next) {
    mysql.connect((db) => {
        var queryObj = {};
        var showObj = {};

        mysql.find(db, "nav" , queryObj, showObj, (result) => {
            res.render('nav', {title:'锋影-nav', activeIndex: 5, isBoss: false, result:result});
            db.close();
        });
    });

});

//添加nav
router.get("/addNav", function (req, res, next) {

    res.render('addNav', {title:'锋影-添加nav', activeIndex: 5, isBoss: false,tip:""})

});

//点击添加nav保存按钮成功
router.post("/addNavAction", function (req, res, next) {
    mysql.connect((db) => {

        var insertData = req.body;
        var queryObj = {navID: insertData.navID};
        var showObj = {};
        mysql.find(db, 'nav', queryObj, showObj, function (result) {
            console.log("result",result)

            if(result.length == 0){
                mysql.insert(db, 'nav', insertData, function(result){

                   res.send("<script> window.location.href = '/nav';</script>");
                    db.close();
                })

            }else{
                res.render('addNav', {title:'锋影-添加nav', activeIndex: 5, isBoss: false, tip:"该nav项已经存在、已添加"})

            }
            db.close();
        })

    });
});

//更新编辑nav信息
router.get("/updateNav", function (req, res, next) {
    var navID = url.parse(req.url, true).query.navID;
    var obj = {
        title: "锋影-更新nav",
        activeIndex: 5,
        isBoss: false,
        navID: navID
    };

    mysql.connect((db) => {

        var queryObj = {
            navID:navID
        };
        var showObj ={
            _id:0,
            navID:1,
            navName:1,
            navSrc:1
        };
        mysql.find(db, "nav", queryObj, showObj, (result) => {
            console.log(queryObj,result);
            var obj = {
                title: "锋影-电影列表",
                activeIndex: 5,
                isBoss: false,
                result: result
            };
            res.render("updateNav",obj);
            db.close();
        });
    });
});

//点击更新保存编辑nav信息事件
router.post("/updateNavAction", (req, res, next) => {
    mysql.connect((db) => {

        var updateObj = req.body;
        var whereObj = {
            navID:updateObj.navID
        };
        mysql.updateOne(db, "nav", whereObj, updateObj, (result) => {
            res.send("<script> window.location.href = '/nav';</script>");
            db.close();
        });
    });
});

//删除nav数据事件
router.get("/deleteNav", (req, res, next) => {
    var navID = url.parse(req.url, true).query.navID;
   mysql.connect((db) => {

       var deleteObj ={
           navID: navID
       };
       mysql.deleteOne(db, "nav", deleteObj, (result) => {
           res.send("<script> window.location.href = '/nav';</script>");
           db.close();
       });

   }) ;
});

module.exports = router;
