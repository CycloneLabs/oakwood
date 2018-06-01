<template lang="pug">
  include button.pug
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        required: false,
        validator: type => (
          ['round', 'simple', 'subbutton', 'negative', 'positive', 'active', 'disabled'].includes(type.trim())
        ),
      },

      types: {
        type: String,
        required: false,
        default: () => '',
        validator: types => (
          types.split(',').every(type => (
            ['round', 'simple', 'subbutton', 'negative', 'positive', 'active', 'disabled', ''].includes(type.trim())
          ))
        ),
      },

      disabled: {
        type: Boolean,
        required: false,
        default: () => false,
      },

      active: {
        type: Boolean,
        required: false,
        default: () => false,
      },
    },

    computed: {
      _types() {
        const externalTypes = [];
        if (this.disabled) externalTypes.push('disabled');
        if (this.active) externalTypes.push('active');
        if (this.type) externalTypes.push(this.type.trim());
        return this.types
          .split(',')
          .map(type => type.trim())
          .concat(externalTypes)
          .filter((value, index, array) => value && array.indexOf(value) === index);
      },

      classes() {
        return this._types.map(type => `button--${type}`).join(' '); // eslint-disable-line no-underscore-dangle
      },
    },
  };
</script>

<style lang="scss" src="./button.scss"></style>
