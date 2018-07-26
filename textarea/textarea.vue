<template lang="pug">
  include template.pug
</template>

<script>
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
      if (this.$attrs.autofocus) this.$refs.control.focus();
    },

    props: {
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
          'textarea--focus': this.focus,
          'textarea--valid': this.valid,
          'textarea--invalid': !this.valid,
          'textarea--disabled': this.disabled,
        };
      },
    },
  };

</script>

<style lang="scss">
  .textarea,
  .textarea__wrapper,
  .textarea__control {
    width: 100%;
  }

  .textarea--disabled {
    pointer-events: none;
  }

  .textarea__wrapper {
    display: flex;
  }

  .textarea__control {
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
    transition-property: color, box-shadow;
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
