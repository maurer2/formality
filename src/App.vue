<template>
  <div class="container" :style="cssVars">
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
      <div v-if="!isMinimized" class="window-body">
        <Form />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, CSSProperties } from 'vue';
import Form from './components/Form.vue';

export default defineComponent({
  name: 'App',
  components: {
    Form,
  },
  data() {
    return {
      isMinimized: false,
      isMaximized: false,
      containerWidthUpperBound: '80rem',
      containerWidthUpperBoundMaximized: 'auto',
    };
  },
  computed: {
    cssVars(): CSSProperties {
      return {
        '--max-container-width': `${this.isMaximized ? this.containerWidthUpperBoundMaximized : this.containerWidthUpperBound}`,
      } as {[key: string]: string};
    },
  },
  methods: {
    handleMinimize() {
      this.isMaximized = false;
    },
    handleMaximize() {
      this.isMaximized = !this.isMaximized;
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

html {
  min-height: 100%;
  font-size: 16px;
  background: var(--surface);
}

body {
  min-height: 100vh;
  overflow-x: hidden;
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
  --min-container-width: 22rem;

  display: grid;
  align-items: center;
  width: var(--max-container-width);
  min-height: 100vh;
  margin: auto;
  padding: 1rem;

  @supports (width: clamp(1px, 2px, 3px)) {
    width: clamp(var(--min-container-width), 75vw, var(--max-container-width));
  }
}
</style>
