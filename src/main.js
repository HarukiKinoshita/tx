import Vue from 'vue'
import App from './App.vue'
import VueCookie from 'vue-cookie';
import VueGtag from "vue-gtag";

Vue.use(VueCookie)
Vue.use(VueGtag, {
  config: { id: process.env.GA_ID }
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
