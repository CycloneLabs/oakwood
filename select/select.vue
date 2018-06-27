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
      if (this.autofocus) this.$refs.control.focus();
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

      value: [String, Number, Boolean],
      autofocus: Boolean,
      disabled: Boolean,
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
        this.$refs.control.focus();
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

      pickNext() {
        if (this.isOpen) {
          const oldIndex = this.options.findIndex(o => o.value === this.focused);
          const newIndex = Math.min(this.options.length - 1, oldIndex + 1);
          this.setFocused(newIndex);
        } else {
          this.open();
        }
      },

      pickPrev() {
        if (this.isOpen) {
          const oldIndex = this.options.findIndex(o => o.value === this.focused);
          const newIndex = Math.max(0, oldIndex - 1);
          this.setFocused(newIndex);
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
          // TODO Bug
          'select--focused': this.focused !== '',
          'select--disabled': this.disabled,
        };
      },

      selected() {
        const selected = this.options.find(option => option.value === this.value);
        return selected && selected.name;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .select,
  .select__option {
    min-height: 1em;
  }

  .select__wrapper:-moz-focusring {
    outline: none;
  }

  .select__wrapper:focus {
    outline: none;
  }
</style>
