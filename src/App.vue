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
  place-items: center stretch;
  width: var(--max-container-width);
  min-height: 100vh;
  margin: auto;
  padding: 1rem;

  @supports (width: clamp(1px, 2px, 3px)) {
    width: clamp(var(--min-container-width), 75vw, var(--max-container-width));
  }

  &--is-minimized {
    // align-items: end;
    // justify-items: start;

    @supports (width: clamp(1px, 2px, 3px)) {
      width: clamp(15rem, 75vw, 15rem);
    }
  }

  &--is-maximized:not(&--is-minimized) {
    // align-items: end;
    // justify-items: start;

    @supports (width: clamp(1px, 2px, 3px)) {
      width: clamp(var(--min-container-width), 75vw, auto);
    }
  }
}
</style>
