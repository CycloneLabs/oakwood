<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    inheritAttrs: false,

    props: {
      preview: {
        required: true,
        type: String,
      },

      full: {
        required: true,
        type: String,
      },
    },

    data() {
      return {
        fullLoaded: false,
        previewLoaded: false,
      };
    },

    methods: {
      onloaded(target) {
        this[`${target}Loaded`] = true;
      },
    },
  };
</script>

<style lang="scss">
  .image {
    height: 100%;
    width: 100%;

    &--preview {
      filter: blur(10px);
    }
  }
</style>
