<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    data() {
      return {
        isOpen: false,
        focused: '',
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
            Object.keys(item).every(key => ['value', 'name'].includes(key) && item[key].toString().trim())
          ));
        },
      },

      value: {
        required: false,
      },

      autofocus: {
        type: Boolean,
      },

      disabled: {
        type: Boolean,
      },
    },

    methods: {
      open() {
        this.focused = typeof this.value !== 'undefined' ? this.value : this.options[0].value;
        this.isOpen = true;
      },

      close() {
        this.isOpen = false;
      },

      moveFocus() {
        this.$refs.select.focus();
      },

      setFocused(index) {
        this.focused = this.options[index].value;
      },

      select(value) {
        if (this.isOpen) {
          this.$emit('input', value);
          this.isOpen = false;
        }
      },

      next() {
        const index = Math.min(this.options.length - 1, this.indexOfFocused + 1);
        this.setFocused(index);
      },

      prev() {
        const index = Math.max(0, this.indexOfFocused - 1);
        this.setFocused(index);
      },

      moveDown() {
        if (this.isOpen) {
          this.next();
        } else {
          this.open();
        }
      },

      moveUp() {
        if (this.isOpen) {
          this.prev();
        }
      },

      pickLast() {
        if (this.isOpen) {
          this.setFocused(this.options.length - 1);
        } else {
          this.open();
        }
      },

      pickFirst() {
        if (this.isOpen) {
          this.setFocused(0);
        }
      },
    },

    computed: {
      classes() {
        return {
          'select--focused': this.focused !== '',
          'select--disabled': this.disabled,
        };
      },

      selected() {
        const selected = this.options.find(o => o.value === this.value) || {};
        return selected.name || '';
      },

      indexOfFocused() {
        return this.options.findIndex(o => o.value === this.focused);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .select,
  .option {
    min-height: 1em;
  }
</style>
