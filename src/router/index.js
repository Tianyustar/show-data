import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Refer from '../components/Refer'
import Tempture from '../components/Tempture'
import Temperature from '../components/Temperature'

Vue.use(Router)
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
    {
      path:'/Charts',
      name:'Tempture',
      component: Tempture
    },
    {
      path:'/Refer/chart',
      name:'Temperature',
      component: Temperature
    }
  ]
})
