<template lang="pug">
  div
    template(v-for = "type in buttonTypes")
      br
      v-button(:type = "type") {{ type }} button
    hr
    v-button(type = "positive", @click = "progress") progress
    v-progress
</template>

<script>
  import button from './../../button/button.vue';

  export default {
    components: {
      'v-button': button,
    },

    methods: {
      testProgressPlugin(n = 10, action = 'increment') {
        const timeouts = Array.from({ length: n }, (v, i) => i * 100);

        return Promise.all(timeouts.map(timeout => new Promise((resolve) => {
          setTimeout(() => {
            this.$progress[action]();
            resolve();
          }, timeout);
        })));
      },

      progress() {
        this.testProgressPlugin(10, 'increment')
          .then(() => this.testProgressPlugin(8, 'decrement'))
          .then(() => setTimeout(this.$progress.terminate(), 1000));
      },
    },

    data() {
      return {
        buttonTypes: ['default', 'disabled'],
      };
    },
  };
</script>
