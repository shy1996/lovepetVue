import Vue from 'vue'
import {Field,Toast} from 'mint-ui'
import homeData from '@/api/homeData.js'
import * as types from '@/store/mutations-types.js'
Vue.use(Field)

export default {
  data(){
    return {
        phone: '',
        captcha: '',
        phoneState: '',
        codeState: false,
        timer:'',
        captchaState: '',
        code: ''
    }
  },
  methods:{
    validatePhone(phone) {
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/
			if(reg.test(phone)) {
				this.phoneState = 'success'
			} else {
				this.phoneState = 'error'
			}
		},

		sendCode() {
			var phone = this.phone

			homeData.sendCode((data) => {
				this.code = data

			}, phone)
			var num = 60;
			clearInterval(this.timer);
			var timer = setInterval(() => {

				if(num <= 0) {
					this.msg = '发送验证码';
					this.codeState = false;
					clearInterval(this.timer);
				} else {
					this.msg = num + 's后重新发送';
					this.codeState = true
				}
				num--;
			}, 1000)

		},
		login() {
			if(this.phone == "") {
				this.phoneState = 'error'
			} else {
				this.phoneState = 'success'
			}
			if(this.phoneState == 'success') {
				if(this.captcha == this.code) {
					this.captchaState = 'success'
					var obj = {
						userID: this.phone
					}
					var chat = this
					homeData.login((data)=> {
						if(data == '1') {
							//this.phoneState = 'error'
							Toast({
								//message: '账号已存在',
								position: 'bottom',
								duration: 2000
							});
							//console.log(obj.userID);
							this.$router.push('/user');
							localStorage.setItem('user',obj.userID);
						} else if(data == '0') {
							Toast({
								//message: '登录成功',
								position: 'bottom',
								duration: 2000
							});
							//console.log(that);
						}
					}, obj)
				} else {
					this.captchaState = 'error'
					Toast({
						message: '验证码错误',
						position: 'bottom',
						duration: 2000
					});
				}
			}

		}
  },
  mounted(){
  },
  watch: {
		phone(newVal, oldVal) {
			this.validatePhone(newVal)
		}
	}
}


