<template>
  <div class="container">
    <article class="window">
      <div class="title-bar">
        <div class="title-bar-text">
          Formality
        </div>
        <div class="title-bar-controls">
          <button aria-label="Minimize" @click="handleMinimize">
            <span class="visually-hidden">Minimize</span>
          </button>
          <button aria-label="Maximize" @click="handleMaximize">
            <span class="visually-hidden">Maximize</span>
          </button>
          <button aria-label="Close" @click="handleClose">
            <span class="visually-hidden">Close</span>
          </button>
        </div>
      </div>
      <div v-if="isMaximized" class="window-body">
        <Form />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import Form from './components/Form.vue';

export default defineComponent({
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
@import "~sanitize.css";
@import "~sanitize.css/forms.css";
@import "~98.css";
@import "./css/98.css/custom-properties.css";

:root {
  --min-container-width: 25rem;
  --max-container-width: 80rem;
}

html {
  min-height: 100%;
  font-size: 16px;
  background: var(--surface);
}

body {
  min-height: 100vh;
  overflow-y: scroll;
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

<style scoped lang="scss">
.container {
  display: grid;
  align-items: center;
  width: clamp(var(--min-container-width), 50vw, var(--max-container-width));
  min-height: 100vh;
  margin: auto;
  padding: 1rem;
}
</style>
