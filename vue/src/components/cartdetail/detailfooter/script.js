import Vue from 'vue';
import axios from 'axios';
export default {
	data(){
		return {
           
		}
	},
	methods: {
		paymoney(){
			localStorage.setItem("orderpro",this.$route.params.item_id);
			window.location.href = "http://localhost:8080/#/paymoney";
		},
		tolovemoney(){
			
		}
    },
    mounted() {	
	
    }
}
