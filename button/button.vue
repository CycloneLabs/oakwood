<template lang="pug">
  include button.pug
</template>

<script>
  export default {
    props: {
      types: {
        type: String,
        required: false,
      },
      default: {
        type: Boolean,
        required: false,
        default: false,
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      }
    },

    computed: {
      computedTypes() {
        const props = Object.keys(this.$props).filter(prop => prop != 'types');
        const types = props.filter(prop => this.$props[prop]);

        if (this.types)
          types.push(...this.types
            .split(' ')
            .map(type => type.trim())
            .filter(type => {
              if (props.includes(type.toLowerCase())) return true
              else console.error(`button.vue: wrong prop given "${type}"`)
            })
          );

        return types.filter((value, i, arr) => value && arr.indexOf(value) === i)
      },

      classes() {
        if (this.computedTypes.length)
          return this.computedTypes.map(type => `button--${type}`).join(' ')
        return `button--default`;
      }
    }
  };

</script>

<style lang="scss">
  .button {
    appearance: initial;
    background-color: transparent;
    border: none;
    box-shadow: initial;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    outline: none;
    padding: 0;
    pointer-events: auto;
    text-decoration: none;
    transition: var(--animation-time, 0.3s) ease-out;
    vertical-align: middle;

    &:active {
      transform: translateY(1px);
    }

    &::-moz-focus-inner {
      border: none;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.5),
                  0 0 0 2px rgba(255, 105, 180, 0.5);
    }

    &:disabled,
    &--disabled {
      filter: saturate(0);
      pointer-events: none;
    }
  }
</style>
