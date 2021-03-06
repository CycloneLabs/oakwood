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
      v-input(v-model="hidden", placeholder="Input without label")
      hr
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
        v-select(:options="options", v-model="selected", autofocus)
          | :options="options", @select = "selected = $event", autofocus
        p In user interface design for computer applications, a modal window is a graphical control element subordinate to an application's main window. It creates a mode that disables the main window, but keeps it visible with the modal window as a child window in front of it. Users must interact with the modal window before they can return to the parent application. This avoids interrupting the workflow on the main window. Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box.
        p User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.[1] Modal windows are prone to mode errors.[1][2][3]
        p On the Web, they often show images in detail, such as those implemented by Lightbox library.[4][5]
        p The opposite of modal is modeless. Modeless windows don't block the main window, so the user can switch their focus between them, treating them as palette windows.
        p In user interface design for computer applications, a modal window is a graphical control element subordinate to an application's main window. It creates a mode that disables the main window, but keeps it visible with the modal window as a child window in front of it. Users must interact with the modal window before they can return to the parent application. This avoids interrupting the workflow on the main window. Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box.
        p User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.[1] Modal windows are prone to mode errors.[1][2][3]
        p On the Web, they often show images in detail, such as those implemented by Lightbox library.[4][5]
        p The opposite of modal is modeless. Modeless windows don't block the main window, so the user can switch their focus between them, treating them as palette windows.
        p In user interface design for computer applications, a modal window is a graphical control element subordinate to an application's main window. It creates a mode that disables the main window, but keeps it visible with the modal window as a child window in front of it. Users must interact with the modal window before they can return to the parent application. This avoids interrupting the workflow on the main window. Modal windows are sometimes called heavy windows or modal dialogs because they often display a dialog box.
        p User interfaces typically use modal windows to command user awareness and to display emergency states, though interaction designers argue they are ineffective for that use.[1] Modal windows are prone to mode errors.[1][2][3]
        p On the Web, they often show images in detail, such as those implemented by Lightbox library.[4][5]
        p The opposite of modal is modeless. Modeless windows don't block the main window, so the user can switch their focus between them, treating them as palette windows.
      v-popup(v-if="popupWithSubpopup", @close="closePopupWithSubpopup")
        h1(slot="header") Popup header
        div(slot="footer") popup footer
        v-button(@click="openSubpopup") Open sub-pop-up
      v-popup(v-if="subpopup", @close="closeSubpopup") Popup over popup!
    .examples(name="select")
      v-select(:options="options", v-model="selected", autofocus)
        | :options="options", @select = "selected = $event", autofocus
      v-select(:options="options", v-model="selected")
        | :options="options", v-model = "selected"
      v-select(:options="booleanOptions", v-model="booleanSelected")
        | :options="booleanOptions", v-model = "booleanSelected"
      v-select(:options="booleanOptions", v-model="booleanSelected", disabled)
        | :options="booleanOptions", v-model = "booleanSelected"
    .examples(name="textarea")
      v-textarea(v-model = "textarea")
        b v-model = "textarea"
      hr
      v-textarea(v-model = "textarea", disabled)
        b v-model = "textarea", disabled
      hr
      v-textarea(v-model = "textarea", autofocus)
        b v-model = "textarea", autofocus
      hr
      v-textarea(v-model = "textarea", accesskey="c", readonly)
        b v-model = "textarea", accesskey="c", readonly
      hr
      v-textarea(v-model = "textarea", cols="200", rows="8", wrap="hard")
        b v-model = "textarea", cols="200", rows="8", wrap="hard"
      hr
      form(@submit.prevent="alert")
        v-textarea(required,
          v-model = "short",
          minlength="10",
          maxlength="11",
          :customOutput="true",
          :messages=`{
            tooShort: 'textarea value is too short',
            valueMissing: 'this field is required',
          }`
          )
          b required, minlength="10", maxlength="11"
        button(type="submit") submit form
      hr
    .examples.examples--row(name="lazy images")
      v-image(v-for="(image, key) in images",
        :key="key",
        :preview="image.preview",
        :full="image.full",
        :alt="image.title",
        ) {{ image.title }}
</template>

<script>
  import button from 'button/';
  import input from 'input/';
  import popup from 'popup/';
  import select from 'select/';
  import textarea from 'textarea/';
  import image from 'image/';

  export default {
    components: {
      'v-button': button,
      'v-input': input,
      'v-popup': popup,
      'v-select': select,
      'v-textarea': textarea,
      'v-image': image,
    },

    data() {
      return {
        textarea: 'Wristwatch nodal point tube franchise Shibuya faded katana motion RAF. Convenience store math-rebar monofilament shrine sunglasses network Tokyo voodoo god. Euro-pop alcohol disposable order-flow futurity rifle digital skyscraper long-chain hydrocarbons cartel A.I.. Otaku engine ablative nodality sprawl uplink marketing franchise katana free-market stimulate. Military-grade shoes Shibuya media footage hotdog uplink human decay beef noodles 3D-printed office range-rover grenade.',
        short: '',
        message: '',
        hidden: '',
        popupDefault: false,
        popupWithButton: false,
        popupOverflow: false,
        popupWithSubpopup: false,
        subpopup: false,
        options: [
          { value: 0, name: 'option 0', oneMoreOption: 'which wont cause validation warning' },
          { value: 1, name: 'option 1' },
          { value: 2, name: 'option 2' },
        ],
        booleanOptions: [
          { value: true, name: 'true' },
          { value: false, name: 'false' },
        ],
        booleanSelected: true,
        selected: 2,
        images: [{
          preview: 'https://images.pexels.com/photos/1213049/pexels-photo-1213049.jpeg?auto=compress&cs=tinysrgb&h=4&w=6',
          full: 'https://images.pexels.com/photos/misspell/pexels-photo-1213049.jpeg?auto=compress&cs=tinysrgb&h=426&w=640',
          title: 'incorrect \'full\' url',
        }, {
          preview: 'https://images.pexels.com/photos/misspell/pexels-photo-1043519.jpeg?auto=compress&cs=tinysrgb&h=3&w=6',
          full: 'https://images.pexels.com/photos/1043519/pexels-photo-1043519.jpeg?auto=compress&cs=tinysrgb&h=388&w=640',
          title: 'incorrect \'preview\' url',
        }, {
          preview: 'https://images.pexels.com/photos/681336/pexels-photo-681336.jpeg?auto=compress&cs=tinysrgb&h=3&w=6',
          full: 'https://images.pexels.com/photos/681336/pexels-photo-681336.jpeg?auto=compress&cs=tinysrgb&h=359&w=640',
          title: 'both urls are correct',
        }],
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

  .examples--row {
    flex-flow: row wrap;
  }

  .examples--row::before {
    width: 100%;
  }

  :focus {
    box-shadow: 0 0 4px 2px forestgreen !important;
  }

  .popup {
    background: rgba(0,0,0, 0.4)
  }

  .popup__container {
    width: 40vw;
    background: white;
  }

  .popup__header,
  .popup__footer,
  .popup__body {
    padding: 40px;
  }

  .image__wrapper {
    display: inline-block;
    width:  300px;
  }

  .image__wrapper + .image__wrapper {
    margin-left: 20px;
  }
</style>
