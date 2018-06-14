import popup from './popup.vue';

export default {
  install(Vue, params = {}) {
    Vue.component('v-popup', {
      extends: popup,
      data() {
        return params;
      },
    });
    Vue.use(popup);
  },
};
