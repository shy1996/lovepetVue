var express = require('express');
var router = express.Router();
var mysql = require("./tool/mysql");
var url = require("url");
var multer = require("multer");
var upload = multer({dest:"upload/"});
var fs = require("fs");
var ObjectID = require("mongodb").ObjectID;

/* GET home page. */
var isLogin = 0;
router.get('/', function(req, res, next) {
    //if(req.cookies.isLogin == 1) {
        var petListType = url.parse(req.url, true).query.petListType;
        var petID = url.parse(req.url, true).query.petID;
        var petListStr = "";
        switch (petListType){
            case 0:
                petListStr = "犬类";
                break;
            case 1:
                petListStr = "猫系";
                break;
            case 2:
                petListStr = "小宠";
                break;
        }
         //var  queryObj = {_id:ObjectID()}
         //console.log(petID);
        if(petID){
            var  queryObj = {petID:petID}
        }else if(petListType){
            var queryObj  ={petListType:petListType};
        }else{
            var queryObj = {}
        }
        
        mysql.connect((db) => {
            var showObj = {
                
            };
            mysql.find(db, "petList", queryObj, showObj, (result) => {
                //res.render("petList",{title: "爱在小窝宠物列表", activeIndex: 6, isBoss: true, result:result,petListType:petListType, petListStr:petListStr});
               res.send(result);
                db.close();
            });
        });
    /*}else{
        res.render("login", {title:"登录",errInfo:""});
    }*/

});


//添加宠物按钮事件
router.get("/addPet", function (req, res, next) {
    var petListType = url.parse(req.url, true).query.petListType*1;
    var  petListStr= "";
    if(petListType == 0){
        petListStr = "犬类";
    }else if(petListType == 1){
        petListStr = "猫系";
    }else{
        petListStr = "小宠";
    }
    //console.log(req.url,bannerType);
   res.render("addPet", {title: "爱在小窝", activeIndex: 6, isBoss: true, petListStr:petListStr, petListType:petListType,tip:""}) ;
});

//点击添加里保存宠物按钮事件
router.post("/addPetAction",upload.single('imgUrl'), (req, res, next) => {
    var obj = req.body;
    var petListStr = "";
    switch (obj.petListType){
        case 0:
            petListStr = "犬类"
            break;
        case 1:
            petListStr = "猫系";
            break;
        case 2:
            petListStr = "小宠";
            break;
    };
    var filename = req.file.filename;
    var originalname = req.file.originalname;
    //console.log(filename,originalname);
    fs.rename("upload/"+filename, "upload/"+originalname, (err) => {
        if(err) throw err;
        mysql.connect((db) => {
            //查询数据库是否存在此id
            var insertData = {
                petListType: obj.petListType,
                petID: obj.petID,
                imgUrl: "http://localhost:3000/"+originalname,
                variety:obj.variety,
                age:obj.age,
                sex:obj.sex,
                area:obj.area,
                status:obj.status,
                editor:obj.editor
            };
            var queryObj = {petID:obj.petID,petListType:obj.petListType};
            var showObj = {};
            mysql.find(db,"petList", queryObj, showObj, (result) => {
                if(result.length == 0){
                    mysql.insert(db, "petList", insertData, (result) => {
                        //console.log(result);
                        //重定向，后面是链接的路由地址，接收传参等操作
                        res.redirect("/petList?petListType="+obj.petListType);
                        db.close();
                    });
                }else{
                    res.render('addPet', {title: "爱在小窝", activeIndex: 6, isBoss: true, petListStr:petListStr, petListType:obj.petListType, tip:"该宠物id已经存在、已添加"})
                }

            });

        });
    });

});

//删除宠物
router.get("/deletePet", (req, res, next) => {
    var petID = url.parse(req.url, true).query.petID;
    var petListType = url.parse(req.url, true).query.petListType;
    mysql.connect((db) => {
        var deleteObj = {
            petID: petID
        };
        mysql.deleteOne(db, "petList", deleteObj, (result) => {
            res.redirect("/petList?petListType="+petListType);
            db.close();

       }) ;
    });
});

//编辑更新宠物按钮事件
router.get("/updatePet", (req, res, next) => {
    var petListType = url.parse(req.url, true).query.petListType;
    var petID =url.parse(req.url, true).query.petID;
    var petListStr = "";
    switch (petListType){
        case 0:
            petListStr = "犬类";
            break;
        case 1:
            petListStr = "猫系";
            break;
        case 2:
            petListStr = "小宠";
            break;
    };
    mysql.connect((db) => {
        var queryObj = {petID:petID};
        var showObj = {
            _id: 0
        };
       mysql.find(db, "petList", queryObj, showObj, (result) => {
           res.render("updatePet",{title: "更新列表", activeIndex: 6, isBoss: true, petListStr:petListStr, petListType:petListType,petID:petID, result:result});
       }) ;
    });
});

//更新宠物点击保存按钮事件
router.post("/updatePetAction",upload.single('imgUrl'), (req, res, next) => {
    var obj =req.body;
    var petListStr = "";
    switch (obj.petListType){
        case 0:
            petListStr = "犬类"
            break;
        case 1:
            petListStr = "猫系";
            break;
        case 2:
            petListStr = "小宠";
            break;
    };
    var filename = req.file.filename;
    var originalname = req.file.originalname;

    fs.rename("upload/"+filename, "upload/"+originalname, (err) => {
        if(err) throw err;
        mysql.connect((db) => {
            var updateObj = {
                petListType: obj.petListType,
                petID: obj.petID,
                imgUrl: "http://localhost:3000/"+originalname,
                variety:obj.variety,
                age:obj.age,
                sex:obj.sex,
                area:obj.area,
                status:obj.status,
                editor:obj.editor
            };
            var whereObj = {petID:updateObj.petID};

            mysql.updateOne(db, "petList", whereObj, updateObj, (result) =>{
                res.redirect("/petList?petListType="+obj.petListType);
                db.close();
            }) ;
        });
    });

});

module.exports = router;
