<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    props: {
      closeByBackground: {
        type: Boolean,
        default: true,
      },
      closeByEsc: {
        type: Boolean,
        default: true,
      },
    },

    methods: {
      closeBackground() {
        if (this.closeByBackground) this.$emit('close');
      },
      closeEsc() {
        if (this.closeByEsc) this.$emit('close');
      },
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style lang="scss">
  .popup {
    bottom: 0;
    display: flex;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
  }

  .popup__container {
    margin: auto;
    max-height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  .popup__body {
    overflow: auto;
  }

  .popup__header,
  .popup__body,
  .popup__footer {
    flex: 1 1 auto;
  }
</style>
