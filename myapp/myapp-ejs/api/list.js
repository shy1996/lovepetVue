var express = require('express');
var router = express.Router();
var url = require('url');

var mysql = require("./tool/mysql")

/* GET users listing. */
var isLogin = 0;
router.get('/', function(req, res, next) {
    // res.send('产品列表');
    //if(req.cookies.isLogin == 1) {
        var pageCode = url.parse(req.url, true).query.pageCode * 1;
        var limitNum = url.parse(req.url, true).query.limitNum * 1;
        var item_id = url.parse(req.url, true).query.item_id;
        //console.log(limitNum);
        mysql.connect(function(db){
            console.log("success-movielist");
            if(item_id){
                var  queryObj = {item_id:item_id}
            }else{
                var queryObj = {}
            }
        
            var showObj = {
                _id: 0,
                title: 1,
                item_id: 1,
                pic_path: 1,
                priceWap: 1,
                nick: 1,
                location:1,
                img2:1
            };
            var skipNum = limitNum * (pageCode  - 1);
            mysql.find(db, 'list', queryObj, showObj, function(resultAll) {
                var obj = {
                    title: "爱在小窝",
                    activeIndex: 1,
                    isBoss: false,
                    result:resultAll,
                    sort:0
                };
                //从所有数据中进行分页
                mysql.findFenye(db, "list", queryObj, showObj, limitNum, skipNum, pageCode, (result) => {
                    var totalPages = Math.ceil(resultAll.length / limitNum);//总页数
                    var obj = {
                        title: "爱在小窝",
                        activeIndex: 4,
                        isBoss: false,
                        result: result,
                        allNum: resultAll.length,
                        pageCode: pageCode,
                        totalPages: totalPages,
                        sort:0
                    };
                    //res.render('list', obj);
                    res.send(result);
                    db.close();
                });

            });

        });
   /* }else{
       res.render("login", {title:"登录",errInfo:""});
   }*/

});

//进入更新商品信息页面
router.get('/updateProduct', function(req, res, next){
    var item_id = url.parse(req.url, true).query.item_id;
    var pageCode = url.parse(req.url, true).query.pageCode;
    var obj = {
        title: "爱在小窝",
        activeIndex: 1,
        isBoss: false,
        item_id: item_id,
        pageCode:pageCode
    };

    //依据ID查询本商品
    mysql.connect(function(db){
        var queryObj = {item_id: item_id};
        var showObj = {
            _id: 0
        };

        mysql.find(db, 'list', queryObj, showObj, function(result) {
            var obj = {
                title: "爱在小窝",
                activeIndex: 1,
                isBoss: false,
                result: result,
                pageCode:pageCode
            };
            res.render('updateProduct', obj);
            db.close();
        });


    });

});

//更新商品数据成功
router.post('/updateProductAction', function (req, res, next) {
    var pageCode = url.parse(req.url, true).query.pageCode;
    mysql.connect((db)=>{
        var updateObj = req.body;
        var whereObj ={
            item_id:updateObj.item_id
        };

        mysql.updateOne(db, 'list', whereObj, updateObj, (result)=>{
            res.redirect("/list?limitNum=4&pageCode="+pageCode);
            db.close();
        })
    })
});

//更新数据返回
router.get("/backList", (req,res,next) => {
    var pageCode = url.parse(req.url, true).query.pageCode;
    res.redirect("/list?limitNum=4&pageCode="+pageCode);
});

//删除商品
router.get('/deleteProduct', function (req, res, next) {
    var item_id = url.parse(req.url, true).query.item_id;
    console.log(item_id)

   mysql.connect((db)=>{
       var deleteObj = {
           item_id: item_id
       }

       mysql.deleteOne(db, "list", deleteObj, (result) =>{
           res.send("<script>window.location.href = '/list'</script>");
           db.close();
       });

   }) ;
});

//跳转致添加新的商品页面
router.get('/addProduct', function (req, res, next) {
    var pageCode = url.parse(req.url, true).query.pageCode;
    var obj = {
        title: "爱在小窝",
        activeIndex: 1,
        isBoss: false,
        pageCode:pageCode
    };
    res.render("addProduct", obj);
});

//添加商品信息保存数据
router.post('/addProductAction', function (req, res, next) {
    var pageCode = url.parse(req.url, true).query.pageCode;
    mysql.connect((db) =>{

       var insertData = req.body;

       mysql.insert(db, "list", insertData, (result) => {
           res.redirect("/list?limitNum=4&pageCode="+pageCode);
            db.close();
       });
   }) ;
});

//商品根据价格排序
router.get('/sortPrice', function (req, res, next) {
    var sortPrice = url.parse(req.url, true).query.sortPrice;
    var type = url.parse(req.url, true).query.type;

    mysql.connect((db)=>{
        var queryObj = {

        };
        var showObj = {
            _id: 0,
            title: 1,
            item_id: 1,
            pic_path: 1,
            priceWap: 1,
            nick: 1,
            location:1
        };
        var sortObj = {};
        if(sortPrice == "priceWap"){
            sortObj = {
                priceWap: type*1
            }
        };

        mysql.findSort(db, "list", queryObj, showObj, sortObj , (result) =>{
            var obj = {
                title: "爱在小窝",
                activeIndex: 1,
                isBoss: false,
                result: result,
                sort: type
            };

            //console.log(obj);
            res.render("list", obj);
            db.close();

        })
    });
});

//分页实现
router.get('/kindPage',function (req, res, next) {
    var pageCode = url.parse(req.url, true).query.pageCode * 1;
    var limitNum = url.parse(req.url, true).query.limitNum * 1;

    mysql.connect((db) =>{
        var queryObj = {};
        var showObj = {
          _id: 0,
          id: 1,
            year: 1,
            rating: 1,
            genres: 1,
            title: 1,
            images_small: 1
        };
        var skipNum = limitNum * (pageCode  - 1);

        //先查找出所有的数据
        mysql.find(db, "list", queryObj, showObj, (resultAll) => {
            //从所有数据中进行分页
            mysql.findFenye(db, "list", queryObj, showObj, limitNum, skipNum, pageCode, (result) => {
                var totalPages = Math.ceil(resultAll.length / limitNum);//总页数
                var obj = {
                    title: "锋影-电影列表分页",
                    activeIndex: 1,
                    isBoss: false,
                    result: result,
                    sort: 0,
                    allNum: resultAll.length,
                    pageCode: pageCode,
                    totalPages: totalPages
                };
                console.log(obj);
                res.render("listKindPage", obj);
                db.close();
            });
        });
    });
});

module.exports = router;
