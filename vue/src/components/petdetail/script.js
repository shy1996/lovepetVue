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
    }
  },
  computed:{
    ...mapState(
      ['petdetail']
    )
  },
  methods:{
 
  },
  mounted(){
    var petID = this.$route.params.petID;
    this.$store.dispatch('petdetailaction',petID);
  }
}


