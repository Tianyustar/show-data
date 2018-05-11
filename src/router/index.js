import Vue from 'vue'
import Router from 'vue-router'
import ShowData from '../components/Login'
import Refer from '../components/Refer'
import BaiDuMap from '../components/BaiDuMap'
Vue.use(Router)

export default new Router({
  mode : 'history',
  base: '/showdata/',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: ShowData
    },
    {

      path:'/Refer',
      name:'Refer',
      component: Refer
    },
    {
      path:'/Refer',
      name:'BaiDuMap',
      component: BaiDuMap
    }
  ]
})
