// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';
import * as firebase from "firebase";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'

library.add(faGoogle, faFacebookF)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const FBCONFIG = {
  apiKey: "AIzaSyB7GkamFpWgjh9uGxwoQvbRjKrZzWoI5uo",
  authDomain: "senecauniandes.firebaseapp.com",
  databaseURL: "https://senecauniandes.firebaseio.com",
  projectId: "senecauniandes",
  storageBucket: "senecauniandes.appspot.com",
  messagingSenderId: "1031015928745",
  appId: "1:1031015928745:web:584e8c206d26bb38",
  clientId: "1031015928745-g3ogditto3gld2n30uf4gn1a3pulng5q.apps.googleusercontent.com",
  scopes: [
    "email",
    "profile"
]
};

firebase.initializeApp(FBCONFIG);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
