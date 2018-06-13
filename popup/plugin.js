import popup from './popup.vue';

export default {
  install(Vue) {
    Vue.component('v-popup', popup);
    Vue.use(popup);
  },
};
