import Vue from 'vue'

export default {
    data(){
        return {
 
        }
    },
    methods:{
        loginoutBtn(){
            var loginoutBtn = document.getElementsByClassName('loginoutBtn')[0];
            localStorage.removeItem('user');
            //console.log(loginoutBtn);
            window.location.href="http://localhost:8080/user#/user";
            loginoutBtn.style.display="none";
        },
    },
    mounted(){
        var loginoutBtn = document.getElementsByClassName('loginoutBtn')[0];
        if(!localStorage.getItem('user')){
            loginoutBtn.style.display="none";
         }else{

         }
    },
    watch: {
      
    }
}
    
    
    


