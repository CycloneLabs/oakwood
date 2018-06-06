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

<style lang="scss" src="./button.scss"></style>
