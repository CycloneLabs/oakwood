<template lang="pug">
  include template.pug
</template>

<script>
  const types = ['text', 'email', 'search', 'tel', 'url', 'password', 'number'];
  const errors = ['badInput', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow',
    'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'];

  export default {
    data() {
      return {
        focus: false,
        valid: true,
        message: '',
      };
    },

    mounted() {
      if (this.autofocus) this.$refs.control.focus();
    },

    props: {
      autofocus: Boolean,
      customOutput: Boolean,
      disabled: Boolean,
      value: {
        type: String,
        default: '',
      },
      messages: {
        type: Object,
        default: () => ({}),
        validator: object => (
          Object.keys(object).every(key => errors.includes(key))
        ),
      },
      type: {
        type: String,
        default: 'text',
        validator: value => types.includes(value),
      },
    },

    methods: {

      focusUpdate() {
        setTimeout(() => {
          this.focus = this.$refs.control === document.activeElement && document.hasFocus();
        }, 50);
      },

      input(event) {
        this.validate();
        this.$emit('input', event.target.value);
      },

      validate() {
        const { control } = this.$refs;
        let error = '';

        control.setCustomValidity('');
        errors.forEach((value) => {
          if (control.validity[value]) {
            error = value;
          }
        });

        this.valid = control.validity.valid;
        this.message = this.messages[error] || control.validationMessage;
        control.setCustomValidity(this.message);
      },
    },

    computed: {
      states() {
        return {
          'input--focus': this.focus,
          'input--valid': this.valid,
          'input--invalid': !this.valid,
          'input--disabled': this.disabled,
        };
      },
    },
  };

</script>

<style lang="scss">
  .input,
  .input__wrapper,
  .input__control {
    width: 100%;
  }

  .input--disabled {
    pointer-events: none;
  }

  .input__wrapper {
    display: flex;
  }

  .input__control {
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-fill-color: currentColor;
    appearance: initial;
    background-color: transparent;
    border: none;
    box-shadow: none;
    color: inherit;
    cursor: text;
    display: inline-flex;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    outline: none;
    padding: 0;
    text-decoration: none;
    text-rendering: optimizelegibility;
    transition: var(--animation-time, 0.3s) ease-out;
    vertical-align: middle;
    width: 100%;

    &::placeholder {
      -webkit-text-fill-color: currentColor;
      color: currentColor;
      opacity: 0.5;
      text-align: right;
    }

    &:focus {
      outline: none;
    }
  }
</style>
