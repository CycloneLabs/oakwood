<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    props: {
      backgroundClose: {
        type: Boolean,
        default: true,
      },
    },

    methods: {
      close(byBackground) {
        if (byBackground && this.backgroundClose) {
          this.$emit('close');
        } else if (!byBackground) {
          this.$emit('close');
        }
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
