import  * as types  from './mutations-types.js'

export default {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [types.BANNER_LIST_MUTATION](state, data){
    state.bannerlist = data.result;
  },
  //nav导航
  [types.NAV_LIST_MUTATION](state, data){
    state.navlist = data.result;
  },
  //news新闻列表
  [types.NEWS_LIST_MUTATION](state, data){
    state.newslist = data.result;
  },
  //cartlist新闻列表
  [types.CART_LIST_MUTATION](state, data){
    state.cartlist = data.result;
  },
  //cartdetail列表
  [types.CARTDETAIL_LIST_MUTATION](state, data){
    state.cartdetail = data.result;
  },
  //petlist狗列表
  [types.PETLIST_LIST_MUTATION](state, data){
    state.petlist = data.result;
  },
  //petlist猫列表
  [types.PETCATLIST_LIST_MUTATION](state, data){
    state.petcatlist = data.result;
  },
  //petdetail宠物详情
  [types.PETDETAIL_LIST_MUTATION](state, data){
    state.petdetail = data.result;
  },
  //newlistdetail新闻详情
  [types.NEWLISTDETAIL_LIST_MUTATION](state, data){
    state.newlistdetail = data.result;
  }
}

