import Vue from 'vue'
import 'material-icons/iconfont/material-icons.css';
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Vuesax from 'vuesax'

Vue.use(Router)
Vue.use(Vuesax)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        title: 'Seneca.io - Sobrecupo'
      }
    }
  ]
})
