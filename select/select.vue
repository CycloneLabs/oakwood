<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    data() {
      return {
        opened: false,
        focus: '',
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
        this.focus = typeof this.value !== 'undefined' ? this.value : this.options[0].value;
        this.opened = true;
      },

      close() {
        this.focus = '';
        this.opened = false;
      },

      moveFocus() {
        this.$refs.control.focus();
      },

      setFocus(index) {
        this.focus = this.options[index].value;
      },

      select(value) {
        if (this.opened) {
          this.$emit('input', value);
          this.opened = false;
        }
      },

      pickNext() {
        if (this.opened) {
          const oldIndex = this.options.findIndex(o => o.value === this.focus);
          const newIndex = Math.min(this.options.length - 1, oldIndex + 1);
          this.setFocus(newIndex);
        } else {
          this.open();
        }
      },

      pickPrev() {
        if (this.opened) {
          const oldIndex = this.options.findIndex(o => o.value === this.focus);
          const newIndex = Math.max(0, oldIndex - 1);
          this.setFocus(newIndex);
        }
      },

      pickLast() {
        if (this.opened) {
          this.setFocus(this.options.length - 1);
        } else {
          this.open();
        }
      },

      pickFirst() {
        if (this.opened) {
          this.setFocus(0);
        }
      },
    },

    computed: {
      classes() {
        return {
          'select--focus': document.activeElement === this.$refs.control,
          'select--disabled': this.disabled,
          'select--opened': this.opened,
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
    cursor: default;
    user-select: none;
  }

  .select__wrapper:-moz-focusring {
    outline: none;
  }

  .select__wrapper:focus {
    outline: none;
  }
</style>
