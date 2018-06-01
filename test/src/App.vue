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
        buttonTypes: ['round', 'simple', 'subbutton', 'negative', 'positive', 'active', 'disabled'],
      };
    },
  };
</script>
