import Vue from 'vue'
import axios from 'axios'

export default {
  data(){
    return {
      orderpro:''
    }
  },
  computed:{
   
  },
  methods:{
    //点击加号改变购买商品的数量
    upnumber(){
      this.$refs.pronumber.innerHTML++;
      this.allmoneynumber();
    },
    //点击减号改变购买商品的数量
    downnumber(){
      if(this.$refs.pronumber.innerHTML == 1){
        this.$refs.pronumber.innerHTML = 1;
        return;
      }else{
        this.$refs.pronumber.innerHTML--;
      }
      this.allmoneynumber();
    },
    //计算总价钱的函数
    allmoneynumber(){
      var sum=this.$refs.allmoney.innerHTML;
      var sum2=this.$refs.allmoney2.innerHTML;
      sum = (Number(this.$refs.pronumber.innerHTML)*Number(this.$refs.pricewap.innerHTML)).toFixed(2);
      this.$refs.allmoney.innerHTML = sum;
      sum2 = (Number(this.$refs.pronumber.innerHTML)*Number(this.$refs.pricewap.innerHTML)).toFixed(2);
      this.$refs.allmoney2.innerHTML = sum2;
    }
  },
  mounted(){
    //通过ajax请求，商品的id查询显示下单页面
    var item_id = localStorage.getItem("orderpro");
    axios.get('http://localhost:3000/api/list',{
      params:{
        item_id:item_id
      }
    })
    .then((response)=>{
      this.orderpro = response.data;
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}


