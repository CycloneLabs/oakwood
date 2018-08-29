<template lang="pug">
  include template.pug
</template>

<script>
  export default {
    data() {
      return {
        focus: false,
        opened: false,
        focusValue: '',
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
            ['value', 'name'].every(key => (
              Object.prototype.hasOwnProperty.call(item, key) && item[key].toString().trim()
            ))
          ));
        },
      },

      value: [String, Number, Boolean],
      autofocus: Boolean,
      disabled: Boolean,
    },

    methods: {
      open() {
        this.focusValue = typeof this.value !== 'undefined' ? this.value : this.options[0].value;
        this.opened = true;
      },

      close() {
        this.focusValue = '';
        if (this.opened) {
          this.opened = false;
        } else {
          this.$refs.control.blur();
        }
      },

      toggle() {
        if (this.opened) {
          this.close();
        } else {
          this.open();
        }
      },

      focusUpdate() {
        setTimeout(() => {
          this.focus = this.$refs.control === document.activeElement && document.hasFocus();
          if (!this.focus) {
            this.close();
          }
        }, 50);
      },

      focusMove() {
        this.$refs.control.focus();
      },

      setFocusValue(index) {
        this.focusValue = this.options[index].value;
      },

      select(value) {
        if (this.opened) {
          this.$emit('input', value);
          this.opened = false;
        }
      },

      pickNext() {
        if (this.opened) {
          const oldIndex = this.options.findIndex(o => o.value === this.focusValue);
          const newIndex = Math.min(this.options.length - 1, oldIndex + 1);
          this.setFocusValue(newIndex);
        } else {
          this.open();
        }
      },

      pickPrev() {
        if (this.opened) {
          const oldIndex = this.options.findIndex(o => o.value === this.focusValue);
          const newIndex = Math.max(0, oldIndex - 1);
          this.setFocusValue(newIndex);
        }
      },

      pickLast() {
        if (this.opened) {
          this.setFocusValue(this.options.length - 1);
        } else {
          this.open();
        }
      },

      pickFirst() {
        if (this.opened) {
          this.setFocusValue(0);
        }
      },
    },

    computed: {
      classes() {
        return {
          'select--focus': this.focus,
          'select--disabled': this.disabled,
          'select--opened': this.opened,
          'select--nolabel': !this.$slots.default,
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

  .select--disabled {
    pointer-events: none;
  }
</style>
