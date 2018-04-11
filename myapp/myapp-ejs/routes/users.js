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
            mysql.find(db, "user", queryObj, showObj, (result) => {
                res.render('user', {title: "爱在小窝", activeIndex: 2, isBoss: true, result:result});
                db.close();
            }) ;
        });
    }else{
        res.render("login", {title:"登录",errInfo:""});
    }
});



//跳转致添加用户页面
router.get('/addUser', function (req, res, next) {
    var obj = {
        title: "爱在小窝",
        activeIndex: 2,
        isBoss: false,
    };
    res.render("addUser", obj);
});

//添加用户信息保存数据
router.post('/addUserAction', upload.single('userHead'), function (req, res, next) {
    var obj = req.body;
    var filename = req.file.filename;
    var originalname = req.file.originalname;
    fs.rename("upload/"+filename, "upload/"+originalname, (err) => {
        if (err) throw err;
        mysql.connect((db) =>{
            var insertData ={
                userID:obj.userID,
                username:obj.username,
                password:obj.password,
                userHead: "http://localhost:3000/"+originalname,
            };
            mysql.insert(db, "user", insertData, (result) => {
                //res.render("user", {title:"爱在小窝",activeIndex: 2, isBoss: true,result:result});
                res.redirect("/users");
                db.close();
            });
        }) ;
    });

});

//进入更新用户信息页面
router.get('/updateUser', function(req, res, next){
    var userID = url.parse(req.url, true).query.userID;
    var obj = {
        title: "爱在小窝",
        activeIndex: 2,
        isBoss: false,
        userID: userID
    };

    //依据ID查询
    mysql.connect(function(db){
        var queryObj = {userID: userID};
        var showObj = {
            _id: 0
        };

        mysql.find(db, 'user', queryObj, showObj, function(result) {
            var obj = {
                title: "爱在小窝",
                activeIndex: 2,
                isBoss: false,
                result: result
            };
            res.render('updateUser', obj);
            db.close();
        });
    });

});

//更新用户数据成功
router.post('/updateUserAction', upload.single('userHead'),function (req, res, next) {
    var obj = req.body;
    var filename = req.file.filename;
    var originalname = req.file.originalname;

    fs.rename("upload/"+filename, "upload/"+originalname, (err) => {
        if(err) throw err;
        mysql.connect((db) => {
            var updateObj = {
                userID: obj.userID,
                userHead: "http://localhost:3000/"+originalname,
                username:obj.username,
                password:obj.password,
            };
            var whereObj = {userID:obj.userID};

            mysql.updateOne(db, "user", whereObj, updateObj, (result) =>{
                res.redirect("/users");
                db.close();
            }) ;
        });
    });

});

//删除用户
router.get('/deleteUser', function (req, res, next) {
    var userID = url.parse(req.url, true).query.userID;
    console.log(userID);

    mysql.connect((db)=>{
        var deleteObj = {
            userID: userID
        }

        mysql.deleteOne(db, "user", deleteObj, (result) =>{
           // console.log(result)
            res.redirect("/users");
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
