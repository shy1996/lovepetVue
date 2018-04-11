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
    	list:{}
    }
  },
  computed:{
    ...mapState(
      ['cartdetail']
    )
  },
  methods:{
 
  },
  mounted(){
    var item_id =this.$route.params.item_id;
    this.$store.dispatch('cartdetailaction',item_id);
//		console.log(this);

  },
  watch:{
  	cartdetail(value){
    	if(this.cartdetail.length){
    		this.list = this.cartdetail[0];
//  		console.log(this.list);
    	}
  	}
  }
  
}


