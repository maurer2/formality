<template>
  <div class="container" :class="cssClasses" :style="cssVars">
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
import { defineComponent } from 'vue';
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
      containerWidthLowerBound: '23rem',
      containerWidthUpperBound: '80rem',
      containerWidthLowerboundMinimized: '10rem',
      containerWidthUpperBoundMaximized: 'auto',
    };
  },
  computed: {
    cssVars(): Record<string, string> {
      return {
        '--min-container-width': this.containerWidthLowerBound,
        '--max-container-width': this.containerWidthUpperBound,
      };
    },
    cssClasses(): Record<string, boolean> {
      const container = 'container';

      return {
        [`${container}--is-minimized`]: this.isMinimized,
        [`${container}--is-maximized`]: this.isMaximized,
      };
    },
  },
  methods: {
    handleMinimize(): void {
      this.isMinimized = !this.isMinimized;
    },
    handleMaximize(): void {
      this.isMaximized = !this.isMaximized;
    },
    handleClose(): void {
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
  display: grid;
  grid-auto-rows: auto;
  grid-auto-flow: column;
  grid-template-columns: 100vw;
  align-content: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;

  @supports (width: clamp(1px, 2px, 3px)) {
    grid-template-columns: clamp(var(--min-container-width), 75vw, var(--max-container-width));
  }

  &--is-minimized {
    grid-template-columns: 10rem;
    align-content: end;
    justify-content: start;
  }

  &--is-maximized:not(&--is-minimized) {
    grid-template-columns: 100%;
  }
}
</style>
