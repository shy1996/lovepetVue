var express = require('express');
var router = express.Router();
var mysql = require("./tool/mysql");
var url = require("url");
var multer = require("multer");
var upload = multer({dest:"upload/"});
var fs = require("fs");

/* GET users listing. */
var isLogin = 0;
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
    if(req.cookies.isLogin == 1) {
        mysql.connect((db) => {
            var queryObj = {};
            var showObj = {
                _id:0
            };
            mysql.find(db, "nav", queryObj, showObj, (result) => {
                res.render('nav', {title: "爱在小窝", activeIndex:7, isBoss: true, result:result});
                db.close();
            }) ;
        });
    }else{
        res.render("login", {title:"登录",errInfo:""});
    }

});
//api
var isLogin = 0;
router.get('/api', function(req, res, next) {
  // res.send('respond with a resource');
    //if(req.cookies.isLogin == 1) {
        mysql.connect((db) => {
            var queryObj = {};
            var showObj = {
                _id:0
            };
            mysql.find(db, "nav", queryObj, showObj, (result) => {
                //res.render('nav', {title: "爱在小窝", activeIndex:7, isBoss: true, result:result});
                res.send(result);
                db.close();
            }) ;
        });
    // }else{
    //     res.render("login", {title:"登录",errInfo:""});
    // }

});

//跳转致添加录播图页面
router.get('/addNav', function (req, res, next) {
    var obj = {
        title: "爱在小窝",
        activeIndex: 7,
        isBoss: false,
    };
    res.render("addNav", obj);
});

//添加轮播信息保存数据
router.post('/addNavAction', function (req, res, next) {
    var obj = req.body;
    //console.log(obj);

        mysql.connect((db) =>{
            var insertData ={
                navID:obj.navID,
                navName:obj.navName,
                navSrc:obj.navSrc,
                navLink:obj.navLink
            };
            mysql.insert(db, "nav", insertData, (result) => {
                console.log(result);
                //res.render("user", {title:"爱在小窝",activeIndex: 2, isBoss: true,result:result});
                res.redirect("/nav");
                db.close();
            });
        }) ;
    //});

});

//进入更新用户信息页面
router.get('/updateNav', function(req, res, next){
    var navID = url.parse(req.url, true).query.navID;
    var obj = {
        title: "爱在小窝",
        activeIndex: 7,
        isBoss: false,
        navID: navID
    };

    //依据ID查询
    mysql.connect(function(db){
        var queryObj = {navID: navID};
        var showObj = {
            _id: 0
        };

        mysql.find(db, 'nav', queryObj, showObj, function(result) {
            var obj = {
                title: "爱在小窝",
                activeIndex: 7,
                isBoss: false,
                result: result
            };
            res.render('updateNav', obj);
            db.close();
        });
    });

});

//更新用户数据成功
router.post('/updateNavAction',function (req, res, next) {
    var obj = req.body;
   
        mysql.connect((db) => {
            var updateObj = {
                navID: obj.navID,
                navName:obj.navName,
                navSrc:obj.navSrc,
                navLink:obj.navLink
            };
            var whereObj = {navID:obj.navID};

            mysql.updateOne(db, "nav", whereObj, updateObj, (result) =>{
                res.redirect("/nav");
                db.close();
            }) ;
        });
    
});

//删除用户
router.get('/deleteNav', function (req, res, next) {
    var navID = url.parse(req.url, true).query.navID;

    mysql.connect((db)=>{
        var deleteObj = {
            navID: navID
        }

        mysql.deleteOne(db, "nav", deleteObj, (result) =>{
           // console.log(result)
            res.redirect("/nav");
            db.close();
        });

    }) ;
});

//登录
router.post("/loginAction", (req, res, next) => {
   var obj = req.body;
    mysql.connect(function(db){
        var queryObj = obj;
        var showObj = {};
        mysql.find(db, "user", queryObj, showObj, function(result){
            if(result.length > 0) {
                //跳转到首页
                res.cookie("isLogin", 1);
                res.redirect("/")
            }else{
                res.render('login',{title:'登录',errInfo:"用户名或者密码错误"});
            }
        })

    });
});

//退出登录
router.get("/loginOut", (req, res, next) => {
    res.clearCookie("isLogin");
    res.redirect("/");
});

module.exports = router;
