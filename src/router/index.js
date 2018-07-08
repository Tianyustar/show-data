import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Refer from '../components/Refer'

Vue.use(Router);
export default new Router({
  mode : 'history',
  base: '/showdata',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {

      path:'/Refer',
      name:'Refer',
      component: Refer
    },
  ]
})
