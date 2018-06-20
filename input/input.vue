<template lang="pug">
  include template.pug
</template>

<script>
  const types = ['text', 'email', 'search', 'tel', 'url', 'password', 'number'];
  const messageTypes = ['badInput', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow',
    'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'];

  export default {
    data() {
      return {
        focus: false,
        valid: true,
        validationMessage: '',
      };
    },

    mounted() {
      this.$refs.input.value = this.value;
      if (this.autofocus) this.$refs.input.focus();
    },

    props: {
      required: Boolean,
      disabled: Boolean,
      autofocus: Boolean,
      placeholder: String,
      minlength: Number,
      maxlength: Number,
      pattern: String,
      value: {
        type: String,
        default: '',
      },
      validationMessages: {
        type: Object,
        required: false,
        default: () => ({}),
        validator: value => (
          Object.keys(value).every(type => messageTypes.includes(type))
        ),
      },
      type: {
        type: String,
        default: 'text',
        validator: value => types.includes(value),
      },
    },

    methods: {
      input(event) {
        this.checkValidity();
        this.$emit('input', event.target.value);
      },

      checkValidity() {
        const { input } = this.$refs;
        input.setCustomValidity('');
        this.valid = input.validity.valid;
        this.validationMessage = this.valid ? '' : this.getFailureMessage(input);
        input.setCustomValidity(this.validationMessage);
      },

      getFailureMessage(input) {
        let failedProperty;

        for (const property in input.validity) { // eslint-disable-line no-restricted-syntax
          if (input.validity[property]) {
            failedProperty = property;
          }
        }

        return this.validationMessages[failedProperty] || input.validationMessage;
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
    opacity: 0.5;
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
      box-shadow: 0 2px #488144;
    }
  }
</style>
