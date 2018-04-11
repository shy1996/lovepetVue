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
    //if(req.cookies.isLogin == 1) {
        mysql.connect((db) => {
            var queryObj = {};
            var showObj = {
                _id:0
            };
            mysql.find(db, "banner", queryObj, showObj, (result) => {
               // res.render('banner', {title: "爱在小窝", activeIndex: 5, isBoss: true, result:result});
               res.send(result); 
               db.close();
            }) ;
        });
    // }else{
    //     res.render("login", {title:"登录",errInfo:""});
    // }

});

//跳转致添加录播图页面
router.get('/addBanner', function (req, res, next) {
    var obj = {
        title: "爱在小窝",
        activeIndex: 5,
        isBoss: false,
    };
    res.render("addBanner", obj);
});

//添加轮播信息保存数据
router.post('/addBannerAction', function (req, res, next) {
    var obj = req.body;
    console.log(obj);
    // var filename = req.file.filename;
    // var originalname = req.file.originalname;
    //fs.rename("upload/"+filename, "upload/"+originalname, (err) => {
        //if (err) throw err;
        mysql.connect((db) =>{
            var insertData ={
                bannerID:obj.bannerID,
                bannerName:obj.bannerName,
                bannerSrc:obj.bannerSrc,
                bannerLink:obj.bannerLink
                //userHead: "http://localhost:3000/"+originalname,
            };
            mysql.insert(db, "banner", insertData, (result) => {
                console.log(result);
                //res.render("user", {title:"爱在小窝",activeIndex: 2, isBoss: true,result:result});
                res.redirect("/banner");
                db.close();
            });
        }) ;
    //});

});

//进入更新用户信息页面
router.get('/updateBanner', function(req, res, next){
    var bannerID = url.parse(req.url, true).query.bannerID;
    var obj = {
        title: "爱在小窝",
        activeIndex: 5,
        isBoss: false,
        bannerID: bannerID
    };

    //依据ID查询
    mysql.connect(function(db){
        var queryObj = {bannerID: bannerID};
        var showObj = {
            _id: 0
        };

        mysql.find(db, 'banner', queryObj, showObj, function(result) {
            var obj = {
                title: "爱在小窝",
                activeIndex: 5,
                isBoss: false,
                result: result
            };
            res.render('updateBanner', obj);
            db.close();
        });
    });

});

//更新用户数据成功
router.post('/updateBannerAction',function (req, res, next) {
    var obj = req.body;
   
        mysql.connect((db) => {
            var updateObj = {
                bannerID: obj.bannerID,
                bannerName:obj.bannerName,
                bannerSrc:obj.bannerSrc,
                bannerLink:obj.bannerLink
            };
            var whereObj = {bannerID:obj.bannerID};

            mysql.updateOne(db, "banner", whereObj, updateObj, (result) =>{
                res.redirect("/banner");
                db.close();
            }) ;
        });
    
});

//删除用户
router.get('/deleteBanner', function (req, res, next) {
    var bannerID = url.parse(req.url, true).query.bannerID;

    mysql.connect((db)=>{
        var deleteObj = {
            bannerID: bannerID
        }

        mysql.deleteOne(db, "banner", deleteObj, (result) =>{
           // console.log(result)
            res.redirect("/banner");
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
