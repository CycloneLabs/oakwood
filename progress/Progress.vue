<template lang="pug">
  transition(duration = "200",
    enter-class = "progress--transparent",
    leave-to-class = "progress--transparent")
    .progress(v-if = "value", :style = "style")
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

    props: {
      spinner: {
        default: '#7603BD',
        type: String,
        required: false,
      },

      background: {
        default: '#FFFFFF',
        type: String,
        required: false,
      },

      size: {
        default: 50,
        required: false,
      },
    },

    computed: {
      style() {
        return {
          '--size': `${parseInt(this.size, 10)}px`,
          '--spinner': this.hexToRgb(this.spinner),
          '--background': this.hexToRgb(this.background),
        };
      },
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
    background: rgba(var(--background), 0.2);
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
      border: 5px solid rgba(var(--spinner), 1);
      border-bottom-color: rgba(var(--spinner), 0.5);
      display: flex;
      height: var(--size);
      justify-content: center;
      width: var(--size);
    }

    &__counter {
      animation: rotate 5s linear reverse infinite;
    }

    &--transparent {
      opacity: 0;
    }
  }

</style>
