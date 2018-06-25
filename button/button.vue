<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    props: {
      types: String,
      default: Boolean,
      disabled: Boolean,
    },

    computed: {
      computedTypes() {
        const props = Object.keys(this.$props).filter(prop => prop !== 'types');
        const types = props.filter(prop => this.$props[prop]);

        if (this.types) {
          types.push(...this.types
            .split(' ')
            .map(type => type.trim().toLowerCase())
            .filter(type => props.includes(type)));
        }

        return types.filter((value, i, arr) => value && arr.indexOf(value) === i);
      },

      classes() {
        if (this.computedTypes.length) {
          return this.computedTypes.map(type => `button--${type}`).join(' ');
        }

        return 'button--default';
      },
    },
  };

</script>

<style lang="scss">
  .button {
    appearance: initial;
    background-color: transparent;
    border: none;
    box-shadow: none;
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
      box-shadow: 0 2px #488144;
    }

    &:disabled,
    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
