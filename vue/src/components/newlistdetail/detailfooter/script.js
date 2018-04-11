import Vue from 'vue';
import axios from 'axios';
export default {
	data(){
		return {
           
		}
	},
	methods: {
		clickok(){
			var dianzan = this.$refs.dianzan.innerHTML;
			dianzan++;
			this.$refs.dianzan.innerHTML = dianzan;
			this.$refs.dianzancolor.style.color = "#f66";
			// console.log(this.$refs.dianzan.innerHTML,dianzan);
			// return;
		}
    },
    mounted() {	
	
    }
}
