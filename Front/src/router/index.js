import Vue from 'vue'
import 'material-icons/iconfont/material-icons.css';
import Router from 'vue-router'
import IndexPensum from '@/components/PensumApp/Index'
import Vuesax from 'vuesax'
import VueDragDrop from 'vue-drag-drop';
import vueSmoothScroll from 'vue-smooth-scroll'
import IndexAcademical from '@/components/Academical/Index'
import IndexSobrecupo from '@/components/Sobrecupo/Index'
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/fullcalendar.css'
import VueCookies from 'vue-cookies'
import VModal from 'vue-js-modal'
import VueSpinners from 'vue-spinners'
import VueClipboard from 'vue-clipboard2'
import vueHeadful from 'vue-headful';
import VueCarousel from 'vue-carousel';



VueClipboard.config.autoSetContainer = true

Vue.use(Router)
Vue.use(Vuesax)
Vue.use(VueDragDrop);
Vue.use(vueSmoothScroll);
Vue.use(FullCalendar);
Vue.use(require('vue-moment'));
Vue.use(VueCookies);
Vue.use(VModal);
Vue.use(VueSpinners);
Vue.use(VueClipboard);
Vue.use(VueCarousel);



Vue.component('vue-headful', vueHeadful);

VueCookies.config('30d')



const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Sobrecupo',
      component: IndexSobrecupo,
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

export default router;

