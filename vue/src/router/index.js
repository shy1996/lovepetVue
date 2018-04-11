import Vue from 'vue'
import Router from 'vue-router'
import HomeHeader from '@/components/home/header'
import Home from '@/components/home'
import KindHeader from '@/components/kind/header'
import Kind from '@/components/kind'
import CartHeader from '@/components/cart/header'
import Cart from '@/components/cart'
import PayMoneyHeader from '@/components/paymoney/header'
import PayMoneyFooter from '@/components/paymoney/paymoneyfooter'
import PayMoney from '@/components/paymoney'
import UserHeader from '@/components/user/header'
import User from '@/components/user'
import CartDetailHeader from '@/components/cartdetail/header'
import CartDetailFooter from '@/components/cartdetail/detailfooter'
import CartDetail from '@/components/cartdetail'
import PetDetailHeader from '@/components/petdetail/header'
import PetDetail from '@/components/petdetail'
import NewListDetailHeader from '@/components/newlistdetail/header'
import NewListDetailFooter from '@/components/newlistdetail/detailfooter'
import NewListDetail from '@/components/newlistdetail'
import Login from '@/components/login'
import KindDog from '@/components/kind/dog'
import KindCat from '@/components/kind/cat'

import MainFooter from '@/components/footer/mainfooter'
Vue.use(Router)

const _user = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      components: {
        header: HomeHeader,
        content: Home,
        footer: MainFooter
      }
    },
    {
      path: '/kind',
      name: 'kind',
      components: {
        header: KindHeader,
        content: Kind,
        footer: MainFooter
      },
      children:[
        {
            path:"dog",
            component:KindDog
        },
        {
            path:"cat",
            component:KindCat
        },
        {
            path:"",
            redirect:"dog"
        }
      ]
    },
    {
      path:'/petdetail/:petID',
      name:"petdetail",
      components:{
          header:PetDetailHeader,
          content:PetDetail,
          footer: MainFooter
      },
      props:{
          header:true,
          content:true,
          id:true
      }
    },
    {
      path:'/newlistdetail/:newID',
      name:"newlistdetail",
      components:{
          header:NewListDetailHeader,
          content:NewListDetail,
          footer: NewListDetailFooter
      },
      props:{
          header:true,
          content:true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        header: CartHeader,
        content: Cart,
        footer: MainFooter
      }
    },
    {
      path:'/cartdetail/:item_id',
      name:"cartdetail",
      components:{
          header:CartDetailHeader,
          content:CartDetail,
          footer: CartDetailFooter
      },
      props:{
          header:true,
          content:true
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        header: UserHeader,
        content: User,
        footer: MainFooter
      }
    },
    {
      path: '/paymoney',
      name: 'paymoney',
      components: {
        header: PayMoneyHeader,
        content: PayMoney,
        footer: PayMoneyFooter
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        content: Login,
      }
    },
    {
      path:"/",
      redirect:"/home"
    }
  ]
})
