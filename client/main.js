/* eslint-disable */
import 'babel-polyfill';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';

import App from './App';
import Options from './components/Options';
import Chart from './components/Chart';
import store from './store';

if (process.env.NODE_ENV !== 'production') {
  Vue.config.debug = true;
}
Vue.config.productionTip = false;

Vue.use(VueSocketio, window.location.host);
Vue.mixin({
  created() {
    this.$appName = process.env.APP_NAME;
  },
});

Vue.component('Options', Options);
Vue.component('Chart', Chart);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
