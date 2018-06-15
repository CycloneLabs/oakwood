<template lang="pug">
  include notify.pug
</template>

<script>
  import button from './../button/';
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
          const index = this.notifications.indexOf(target);
          this.notifications.splice(index, 1);
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
    box-sizing: border-box;
    overflow: hidden;
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
    }

    &__body {
      display: flex;
      flex-flow: column nowrap;
    }
  }
</style>
