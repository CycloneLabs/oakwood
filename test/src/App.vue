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
      v-input(v-model="hidden", :autofocus="true") v-input(:autofocus="true")
      hr
      v-input(v-model="message") v-input(v-model="message")
      span v-model "message": {{ message }}
      hr
      v-input(v-model="hidden", type="email", required) v-input(type="email")
      hr
      v-input(v-model="hidden", pattern="[1-3]{4,5}") v-input(pattern="[1-3]{4,5}")
    .examples(name="input with validation")
      form(@submit.prevent="alert('submit')")
        v-input(type = "email",
          value = "mail@mail.com",
          :messages = "{typeMismatch: 'This is not an email'}",
          :customOutput = "true"
          ) v-input(type = "email", :customOutput = "true")
        v-input(type = "email",
          v-model="hidden",
          required,
          :messages = "{valueMissing: 'Something missing'}"
          ) v-input(type = "email", required)
        v-input(:maxlength = "3") v-input(:maxlength = "3")
        v-input(:minlength = "3") v-input(:minlength = "3")
        v-input v-input
        button(type = "submit") submit
    .examples(name="popup")
      v-button(@click="openPopupDefault") Open default popup
      v-button(@click="openPopupWithButton") Open popup with "close" button
      v-button(@click="openPopupWithSubpopup") Open popup with popup within
      v-button(@click="openPopupOverflow") Open overflowed popup

      v-popup(v-if="popupDefault", @close="closePopupDefault") Popup content place
        h1(slot="header") Popup header
        div(slot="footer") popup footer
      v-popup(v-if="popupWithButton", @close="closePopupWithButton") Popup content place
        h1(slot="header") Popup header
        div(slot="footer") popup footer
        v-button(slot="external", @click="closePopupWithButton") Close button
      v-popup(v-if="popupOverflow", @close="closePopupOverflow")
        h1(slot="header") Popup header
        div(slot="footer") popup footer
        div(style="height: 120vh; width: 40vw; border: 2px dashed orange")
          p In user interface design for computer applications, a modal window is a graphical control element subordinate to an application's main window. It creates a mode that disables the main window, but keeps it visible with the modal window as a child window in front of it. Users must interact with the modal window before they can return to the parent application. This avoids interrupting the workflow on the main window. Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box.
          p User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.[1] Modal windows are prone to mode errors.[1][2][3]

          p On the Web, they often show images in detail, such as those implemented by Lightbox library.[4][5]

          p The opposite of modal is modeless. Modeless windows don't block the main window, so the user can switch their focus between them, treating them as palette windows.
      v-popup(v-if="popupWithSubpopup", @close="closePopupWithSubpopup")
        h1(slot="header") Popup header
        div(slot="footer") popup footer
        v-button(@click="openSubpopup") Open sub-pop-up
      v-popup(v-if="subpopup", @close="closeSubpopup") Popup over popup!
    .examples(name="progress")
      v-button(@click="progress(1)") Progress 1
      v-button(@click="progress(10)") Progress 10
    v-progress
</template>

<script>
  import button from 'button/';
  import input from 'input/';
  import popup from 'popup/';

  export default {
    components: {
      'v-button': button,
      'v-input': input,
      'v-popup': popup,
    },

    data() {
      return {
        message: '',
        hidden: '',
        popupDefault: false,
        popupWithButton: false,
        popupOverflow: false,
        popupWithSubpopup: false,
        subpopup: false,
      };
    },

    methods: {
      alert(string) {
        alert(string);
      },
      openPopupDefault() {
        this.popupDefault = true;
      },
      closePopupDefault() {
        this.popupDefault = false;
      },
      openPopupWithButton() {
        this.popupWithButton = true;
      },
      closePopupWithButton() {
        this.popupWithButton = false;
      },
      openPopupOverflow() {
        this.popupOverflow = true;
      },
      closePopupOverflow() {
        this.popupOverflow = false;
      },
      openPopupWithSubpopup() {
        this.popupWithSubpopup = true;
      },
      closePopupWithSubpopup() {
        this.popupWithSubpopup = false;
      },
      openSubpopup() {
        this.subpopup = true;
      },
      closeSubpopup() {
        this.subpopup = false;
      },
      progress(n) {
        if (n) {
          this.$progress.increment();
          setTimeout(() => this.$progress.decrement(), 2000);
          setTimeout(() => this.progress(n-1), 200);
        }
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
