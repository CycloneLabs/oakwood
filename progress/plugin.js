import Progress from './Progress.vue';
import events from './events';

export default {
  install(Vue) {
    Vue.component('v-progress', Progress);
    Vue.use(Progress);

    Vue.prototype.$progress = { // eslint-disable-line no-param-reassign
      decrement: () => events.$emit('decrement'),
      increment: () => events.$emit('increment'),
      terminate: () => events.$emit('terminate'),
    };
  },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Progress);
}
