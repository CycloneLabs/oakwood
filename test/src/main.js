import Vue from 'vue';
import App from './App.vue';

import progress from './../../dist/progress'

Vue.use(progress);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render(h) {
    return h(App);
  },
});
