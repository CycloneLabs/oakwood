<template lang="pug">
  include notify.pug
</template>

<script>
  import button from './../button/button.vue';
  import events from './events';

  export default {
    data() {
      return {
        notifications: [],
      };
    },

    props: {
      timeout: {
        required: false,
        type: Number,
        default: 5000,
      },

      animation: {
        required: false,
        type: Number,
        default: 200,
      },
    },

    components: {
      'v-button': button,
    },

    created() {
      events.$on('default', e => this.append(e, 'default'));
    },

    methods: {
      destroyNotification(target, prevent = false) {
        if (!prevent) {
          this.notifications = this.notifications.filter(notification => notification !== target);
        }
      },

      append(message, type) {
        const notification = {
          type,
          timestamp: new Date().getTime(),
          className: `notification--${type}`,
        };

        if (typeof message !== 'object') {
          notification.message = message;
        } else if (!message.status) {
          notification.message = message.message;
        } else {
          notification.status = message.status;
          notification.message = message.status ? `${message.status} ${message.statusText}` : message.stack;
        }

        this.notifications.unshift(notification);

        if (type !== 'error') {
          setTimeout(() => this.destroyNotification(notification), this.timeout);
        }
      },
    },
  };
</script>

<style lang="scss">
  :root {
    --animation: 200ms;
  }

  .notification {
    background-color: rgba(grey, 0.5);
    box-sizing: border-box;
    margin-top: 10px;
    overflow: hidden;
    padding: 10px;
    position: relative;
    transition: var(--animation) opacity;
    pointer-events: initial;
    width: 100%;

    &--appear,
    &--disappear {
      opacity: 0;
    }

    &--move {
      transition: transform var(--animation);
    }

    &__container {
      box-sizing: border-box;
      overflow: hidden;
      pointer-events: none;
      position: fixed;
      right: 20px;
      top: 20px;
      width: 290px;
      z-index: 2000;
    }

    &__body {
      display: flex;
      flex-flow: column nowrap;
    }

    &__close {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
</style>
