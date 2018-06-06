<template lang="pug">
  div
    template(v-for = "type in buttonTypes")
      br
      v-button(:type = "type") {{ type }} button
</template>

<script>
  import button from './../../button/button.vue';

  export default {
    components: {
      'v-button': button,
    },

    data() {
      return {
        buttonTypes: ['default', 'disabled'],
      };
    },
  };
</script>
