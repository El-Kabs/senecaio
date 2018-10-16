import Vue from 'vue'
import 'material-icons/iconfont/material-icons.css';
import Router from 'vue-router'
import Sobrecupo from '@/components/HelloWorld'
import IndexPensum from '@/components/PensumApp/Index'
import Vuesax from 'vuesax'
import VueDragDrop from 'vue-drag-drop';

Vue.use(Router)
Vue.use(Vuesax)
Vue.use(VueDragDrop);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sobrecupo',
      component: Sobrecupo,
      meta:{
        title: 'Seneca.io - Sobrecupo'
      }
    },
    {
      path: '/PensumApp',
      name: 'IndexPensum',
      component: IndexPensum,
      meta:{
        title: 'Senaca.io - PensumApp'
      }
    }
  ]
})
