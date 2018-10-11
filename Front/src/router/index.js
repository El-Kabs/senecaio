import Vue from 'vue'
import 'material-icons/iconfont/material-icons.css';
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Vuesax from 'vuesax'
import VueDragDrop from 'vue-drag-drop';

Vue.use(Router)
Vue.use(Vuesax)
Vue.use(VueDragDrop);

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
