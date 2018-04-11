import myajax from './mytool/myajax.js'
export default {
  //请求首页banner的数据
  bannerlist(cb){
    var option = {
      url: "http://localhost:3000/api/banner",
      data: {
        params:{}
    },
    success: function(data){
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  //请求首页nav的数据
  navlist(cb){
    var option = {
      url: "http://localhost:3000/nav/api",
      data: {
        params:{}
    },
    success: function(data){
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  //请求首页news的数据
  newslist(cb){
    var option = {
      url: "http://localhost:3000/api/news",
      data: {
        params:{}
    },
    success: function(data){
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  //请求赞助cartlist的数据
  cartlist(cb){
    var option = {
      url: "http://localhost:3000/api/list",
      data: {
        params:{
        }
    },
    success: function(data){
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  //请求cartlist详情页面的数据
  cartdetail(cb,item_id){
    var option = {
      url: "http://localhost:3000/api/list",
      data: {
        params:{
          item_id:item_id
        }
    },
    success: function(data){
      //console.log(item_id);
      //console.log(data);
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  //请求petlist狗列表的数据
  petlist(cb){
    var option = {
      url: "http://localhost:3000/api/petList?petListType=0",
      data: {
        params:{
        
        }
    },
    success: function(data){
      //console.log(data);
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  //请求petlist猫的数据
  petcatlist(cb){
    var option = {
      url: "http://localhost:3000/api/petList?petListType=1",
      data: {
        params:{
          
        }
    },
    success: function(data){
      //console.log(data);
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  //请求petdetail的数据
  petdetail(cb,petID){
    var option = {
      url: "http://localhost:3000/api/petList",
      data: {
        params:{
          petID:petID
        }
    },
    success: function(data){
      //console.log(petID);
      //console.log(data);
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
  sendCode(cb,phone){//请求首页banner的数据
    var option = {
    	
      url: "http://localhost:3000/api/users/getCode",
      data: {
        params:{
        	phone:phone
        }
      },
      success: function(data){
        console.log(data);
        cb(data)
      },
      fail:function (err){
        console.log(err)
      }
    }
    myajax.axiosGet(option)
  },
  login(cb,obj){
  	
    var option = {
      url: "http://localhost:3000/api/users/login",
      data: {
        params:obj
      },
      success: function(data){
        //console.log(data);
        cb(data)
      },
      fail:function (err){
        console.log(err)
      }
    }
    myajax.axiosGet(option)
  },
  //请求newlistdetail新闻详情的数据
  newlistdetail(cb,newID){
    var option = {
      url: "http://localhost:3000/api/news",
      data: {
        params:{
          newID:newID
        }
    },
    success: function(data){
      cb(data)
    },
    fail:function (err){
      console.log(err)
    }
    }
    myajax.axiosGet(option)
  },
                                                           
}