<template lang="pug">
  .select
    .select__label(tabindex="-1", @focusin.self = "moveFocus")
      slot
      .select__wrapper(tabindex="0", ref = "select", @click = "open", @blur = "close")
        .select__option {{ selected }}
        .select__dropdown(v-if = "isShown")
          template(v-for = "option in options")
            .select__option(:class = "className(option)",
              @click.stop = "select(option.value)",)
              | {{ option.name }}
</template>

<script>
  export default {
    data() {
      return {
        isShown: false,
      };
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
