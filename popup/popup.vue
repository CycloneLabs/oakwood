<template lang="pug">
  include popup.pug
</template>

<script>
  import button from './../button/button.vue';

  export default {
    components: {
      'v-button': button,
    },

    data() {
      return {
        headerClose: false,
      };
    },

    props: {
      popup: {
        type: Object,
        required: true,
      },
    },

    methods: {
      close(prevent) {
        if (prevent) return false;
        this.$emit('close', this.popup.target);
      },
    },
  }
</script>

<style lang="scss" src="./popup.scss"/>
