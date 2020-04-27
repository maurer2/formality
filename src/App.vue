<template>
  <div
    id="app"
    class="app"
  >
    <article class="wrapper window">
      <div class="title-bar">
        <div class="title-bar-text">
          Formality
        </div>
        <div class="title-bar-controls">
          <button
            aria-label="Minimize"
            @click="handleMinimize"
          >
            <span class="visually-hidden">
              Minimize
            </span>
          </button>
          <button
            aria-label="Maximize"
            @click="handleMaximize"
          >
            <span class="visually-hidden">
              Maximize
            </span>
          </button>
          <button
            aria-label="Close"
            @click="handleClose"
          >
            <span class="visually-hidden">
              Close
            </span>
          </button>
        </div>
      </div>
      <div
        v-if="isMaximized"
        class="window-body"
      >
        <Form />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Form from './components/Form.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Form,
  },
  data() {
    return {
      isMaximized: true,
    };
  },
  methods: {
    handleMinimize() {
      console.log('handleMinimize');
      this.isMaximized = false;
    },
    handleMaximize() {
      this.isMaximized = true;
    },
    handleClose() {
      console.log('close');
    },
  },
});
</script>

<style lang="scss">
@import '~sanitize.css';
@import '~sanitize.css/forms.css';
// @import '~98.css';

html {
  min-height: 100%;
  font-size: 16px;
  background: #c0c0c0;
}

body {
  display: flex;
  min-height: 100vh;
  padding: 2.5rem;
  overflow-y: scroll;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>

<style lang="scss" scoped>
.app {
  flex-grow: 1;
  // dummy
  max-width: 30rem;
  // min-height: inherit; // https://stackoverflow.com/a/43669966
  margin: auto;
}
</style>
