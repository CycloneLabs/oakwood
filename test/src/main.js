import Vue from 'vue';
import events from 'progress/events.js';
import progress from 'progress/progress.vue';
import App from './App';

Vue.component('v-progress', progress);

Vue.prototype.$progress = { // eslint-disable-line no-param-reassign
  decrement: () => events.$emit('decrement'),
  increment: () => events.$emit('increment'),
  terminate: () => events.$emit('terminate'),
};

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render(h) {
    return h(App);
  },
});
