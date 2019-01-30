// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './stylesheets/main.scss'
import store from './store'

import FastClick from 'fastclick'

if('addEventListener' in document){
  document.addEventListener('DOMContentLoad', function(){
    FastClick.attach(document.body);
  }, false)
}
// import { Message } from 'element-ui';
// Vue.component( Message.name, Message);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//自定义指令
import './modules/directive.js';
import './modules/rem.js'

var EventBus = new Vue();
Vue.prototype.$bus= EventBus;

// Object.defineProperties(Vue.prototype, {
//   $bus: {
//     get: function () {
//       return EventBus
//     }
//   }
// })

import 'animate.css'
import 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
