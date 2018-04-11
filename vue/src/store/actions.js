import  * as types  from './mutations-types.js'
import homeData from '@/api/homeData.js'


export default {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  bannerlistaction(context){
    //请求数据
    homeData.bannerlist((data) => {
      //console.log(data)
      context.commit({
        type: types.BANNER_LIST_MUTATION,
        result: data
      })
    })

  },
  //nav导航
  navlistaction(context){
    homeData.navlist((data) => {
      //console.log(data)
      context.commit({
        type: types.NAV_LIST_MUTATION,
        result: data
      })
    })
  },
  //news列表
  newslistaction(context){
    homeData.newslist((data) => {
      //console.log(data)
      context.commit({
        type: types.NEWS_LIST_MUTATION,
        result: data
      })
    })
  },
  //cartlist列表
  cartlistaction(context){
    homeData.cartlist((data) => {
      context.commit({
        type: types.CART_LIST_MUTATION,
        result: data
      })
    })
  },
  //cartdetail列表
  cartdetailaction(context,item_id){
    homeData.cartdetail((data) => {
      context.commit({
        type: types.CARTDETAIL_LIST_MUTATION,
        result: data
      })
    },item_id)
  },
  //petlist狗列表
  petlistaction(context){
    homeData.petlist((data) => {
      context.commit({
        type: types.PETLIST_LIST_MUTATION,
        result: data
      })
    })
  },
  //petlist猫列表
  petcatlistaction(context){
    homeData.petcatlist((data) => {
      context.commit({
        type: types.PETCATLIST_LIST_MUTATION,
        result: data
      })
    })
  },
  //petdetail狗列表
  petdetailaction(context,petID){
    homeData.petdetail((data) => {
      context.commit({
        type: types.PETDETAIL_LIST_MUTATION,
        result: data
      })
    },petID)
  },
  //newlistdetail新闻详情
  newlistdetailaction(context,newID){
    homeData.newlistdetail((data) => {
      context.commit({
        type: types.NEWLISTDETAIL_LIST_MUTATION,
        result: data
      })
    },newID)
  }

}

