<template lang="pug">
  transition(duration = "200",
    enter-class = "progress--transparent",
    leave-to-class = "progress--transparent")
    .progress(v-if = "value")
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
  $spinner-color: #7603bd;

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
      border: 5px solid $spinner-color;
      border-bottom-color: rgba($spinner-color, 0.5);
      display: flex;
      height: 100px;
      justify-content: center;
      width: 100px;
    }

    &__counter {
      animation: rotate 5s linear reverse infinite;
    }

    &--transparent {
      // TODO: add styling
      // otherwise why do you need this class
    }
  }

</style>
