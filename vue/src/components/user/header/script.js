import Vue from 'vue'

export default {
    props: ['headerType'],
    data(){
        return {
            user:''
        }
    },
    methods:{
    
    },
    mounted(){
        props: ['headerType'];
        var loginBtn = document.getElementsByClassName('loginBtn')[0];
        var loginSuccess = document.getElementsByClassName('loginSuccess')[0];
        if(!localStorage.getItem('user')){
             loginBtn.style.display = "block";
             loginBtn.style.zindex = 3;
             loginSuccess.style.display = "none";
        }else{
            loginBtn.style.display = "none";
            this.user=localStorage.getItem('user');
        }
    },
    watch: {
        
    }
}
    
    
    

