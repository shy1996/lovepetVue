import Vue from 'vue'
import {Swipe, SwipeItem,Lazyload} from 'mint-ui'
import homeData from '@/api/homeData.js'
import * as types from '@/store/mutations-types.js'
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
import {mapState} from 'vuex'

export default {
  data(){
    return {
      // bannerlist: []
    }
  },
  computed:{
    ...mapState(
      ['bannerlist','navlist','newslist','cartlist']
    )
  },
  methods:{
    attention(){
      console.log("11");
      console.log(this);
    }
  },
  mounted(){
    //homeData.bannerlist(this.requestBannerListSuccess);
    this.$store.dispatch('bannerlistaction');
    this.$store.dispatch('navlistaction');
    this.$store.dispatch('newslistaction');
    this.$store.dispatch('cartlistaction');
  }
}

