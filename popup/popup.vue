<template lang="pug">
  .popup(@click.self="close")
    .popup__container
      .popup__header(v-if = "$slots.header")
        slot(name="header")
      .popup__body
        slot
      .popup__footer(v-if = "$slots.footer")
        slot(name="footer")
      v-button.popup__close(v-if = "headerClose", @click = "close()") -
</template>

<script>
  export default {
    methods: {
      close() {
        this.$emit('close');
      },
    },
  }
</script>

<style lang="scss">

</style>
