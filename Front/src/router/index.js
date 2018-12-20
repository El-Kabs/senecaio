import Vue from 'vue'
import 'material-icons/iconfont/material-icons.css';
import Router from 'vue-router'
import Sobrecupo from '@/components/HelloWorld'
import IndexPensum from '@/components/PensumApp/Index'
import Vuesax from 'vuesax'
import VueDragDrop from 'vue-drag-drop';
import vueSmoothScroll from 'vue-smooth-scroll'
import IndexAcademical from '@/components/Academical/Index'
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'

Vue.use(Router)
Vue.use(Vuesax)
Vue.use(VueDragDrop);
Vue.use(vueSmoothScroll);
Vue.use(FullCalendar);
Vue.use(require('vue-moment'));

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
    },
    {
      path: '/Academical',
      name: 'IndexAcademical',
      component: IndexAcademical,
      meta:{
        title: 'Seneca.io - Academical'
      }
    }
  ]
})
