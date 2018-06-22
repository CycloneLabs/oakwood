<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    data() {
      return {
        isShown: false,
      };
    },

    mounted() {
      if (this.autofocus) this.$refs.select.focus();
    },

    props: {
      options: {
        type: Array,
        validator(array) {
          return array.every(item => (
            Object.keys(item).every(key => ['value', 'name'].includes(key))
          ));
        },
      },

      value: {
        required: false,
      },

      autofocus: {
        type: Boolean,
      },
    },

    methods: {
      moveFocus() {
        this.$refs.select.focus();
      },

      open() {
        this.isShown = true;
      },

      close() {
        this.isShown = false;
      },

      select(value) {
        this.$emit('select', value);
        this.isShown = false;
      },

      className(option) {
        if (option.value === this.value) {
          return 'select--selected';
        }
        return '';
      },
    },

    computed: {
      selected() {
        const selected = this.options.find(o => o.value === this.value) || {};
        return selected.name || '';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .select {
    &__option {
      border: 1px solid orange;
      min-height: 20px;
    }

    &--selected {
      background: rgba(green, 0.2);
    }
  }
</style>
