<template lang="pug">
  include button.pug
</template>

<script>
  const typesList = ['default', 'disabled'];

  const props = {
    type: {
      type: String,
      required: false,
      validator: type => typesList.indexOf(type.trim()) !== -1,
    },

    types: {
      type: String,
      required: false,
      validator: types => types.split(',')
        .every(type => typesList.indexOf(type.trim()) !== -1),
    },
  }

  typesList.map(type => props[type] = {
    type: Boolean,
    required: false,
    default: false,
  });

  export default {

    props: props,

    computed: {

      computedTypes() {
        const types = [];
        if (this.types) types.concat(this.types.split(',').map(String.prototype.trim));
        if (this.type) types.push(this.type.trim());
        typesList.forEach(type => if(this[type]) types.push(type));

        return types.filter((value, index, array) => value && array.indexOf(value) === index)
      },

      classes() {
        if (!this.computedTypes.length) return 'button' + typesList[0];
        return this.computedTypes.map(type => 'button--'.concat(type)).join(' ');
      },
    },
  };
</script>

<style lang="scss" src="./button.scss"></style>
