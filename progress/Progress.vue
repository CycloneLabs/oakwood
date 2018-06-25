<template lang="pug">
  transition(duration = "200",
    enter-class = "progress--transparent",
    leave-to-class = "progress--transparent")
    .progress(v-if = "value")
      block circle
        .progress__circle
          .progress__counter
            template(v-if = "value") {{ value }}
</template>

<script>
  import events from './events';

  export default {
    created() {
      events.$on('increment', this.increment);
      events.$on('decrement', this.decrement);
      events.$on('terminate', this.terminate);
    },

    data() {
      return {
        value: 0,
      };
    },

    methods: {
      hexToRgb(hexString) {
        const chunks = hexString.slice(-6).match(/.{1,2}/g);
        const color = chunks.map(chunk => parseInt(chunk, 16)).join(', ');
        return color;
      },

      increment() {
        this.value += 1;
      },

      decrement() {
        if (!this.value) console.error(`cannot decrement ${this.value}`);
        else this.value -= 1;
      },

      terminate() {
        this.value = 0;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  .progress {
    align-items: center;
    background: rgba(white, 0.2);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    transition: opacity 0.2s;
    z-index: 3000;

    &__circle {
      align-items: center;
      animation: rotate 5s linear infinite;
      border-radius: 50%;
      border: 5px solid rgba(#9165F1, 1);
      border-bottom-color: rgba(#9165F1, 0.5);
      display: flex;
      height: 50px;
      justify-content: center;
      width: 50px;
    }

    &__counter {
      animation: rotate 5s linear reverse infinite;
    }

    &--transparent {
      opacity: 0;
    }
  }

</style>
