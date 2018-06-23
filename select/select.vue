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
      open() {
        this.focused = this.value || this.options[0].value;
        this.isOpen = true;
      },

      close() {
        this.isOpen = false;
      },

      moveFocus() {
        this.$refs.select.focus();
      },

      select(value) {
        if (this.isOpen) {
          this.$emit('input', value);
          this.isOpen = false;
        }
      },

      next() {
        const index = Math.min(this.options.length - 1, this.indexOfFocused + 1);
        this.focused = this.options[index].value;
      },

      prev() {
        const index = Math.max(0, this.indexOfFocused - 1);
        this.focused = this.options[index].value;
      },

      down() {
        if (this.isOpen) {
          this.next();
        } else {
          this.open();
        }
      },

      up() {
        if (this.isOpen) {
          this.prev();
        }
      },

      altDown() {
        if (this.isOpen) {
          this.focused = this.options.length - 1;
        } else {
          this.open();
        }
      },

      altUp() {
        if (this.isOpen) {
          this.focused = 0;
        }
      },
    },

    computed: {
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
  .select {
    &__value {
      border: 1px solid black;
      min-height: 20px;
    }
  }

  .option {
    border: 1px solid black;
    min-height: 20px;

    &--selected {
      background-image: linear-gradient(90deg, transparent 90%, black 0);
    }

    &--focused {
      background-color: lightcyan;
    }
  }
</style>
