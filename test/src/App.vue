<template lang="pug">
  .root-element
    .examples(name="button")
      v-button v-button
      hr
      v-button(types="default") v-button(types="default")
      hr
      v-button(types="disabled") v-button(types="disabled")
      hr
      v-button(:disabled="true") v-button(:disabled="true")
      hr
      v-button(@click="alert('click')") v-button(@click="alert('click')")
      hr
    .examples(name="input")
      v-input(v-model="hidden") v-input
      hr
      v-input(v-model="hidden") v-input with slot "before"
        button(slot="before") Left!
      hr
      v-input(v-model="hidden") v-input with slot "after"
        button(slot="after") Right!
      hr
      v-input(v-model="hidden") v-input with both slots
        span(slot="before") >>>
        div(slot="after") <<<
      hr
      v-input(v-model="hidden", placeholder="Placeholder...") v-input(placeholder="Placeholder...")
      hr
      v-input(:disabled="true") v-input(:disabled="true")
      hr
      v-input(:disabled="true", placeholder="???") v-input(:disabled="true", placeholder="???")
      hr
      v-input(v-model="hidden", :disabled="true", value="???") v-input(:disabled="true", value="???")
      hr
      v-input(v-model="hidden", :autofocus="true", value="v-input(:autofocus=\"true\")")
      hr
      v-input(v-model="message") v-input(v-model="message")
      span v-model output: {{ message }}
      hr
      v-input(v-model="hidden", type="email") v-input(type="email")
      hr
      v-input(v-model="hidden", pattern="[1-3]{4,5}") v-input(pattern="[1-3]{4,5}")
</template>

<script>
  import button from './../../button/';
  import input from './../../input/';

  export default {
    components: {
      'v-button': button,
      'v-input': input,
    },

    data() {
      return {
        message: '',
        hidden: '',
      };
    },

    methods: {
      alert(string) {
        alert(string);
      },
    },
  };
</script>

<style>
  body {
    margin: 0;
    font-size: 16px;
  }

  hr {
    width: 100%;
  }

  .examples {
    align-items: flex-start;
    border-bottom: thin solid;
    border-right: thin solid;
    display: inline-flex;
    flex-flow: column nowrap;
    font-family: monospace;
    justify-content: space-between;
    padding: 50px;
  }

  .examples::before {
    display: block;
    content: attr(name);
    font-family: sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
</style>
