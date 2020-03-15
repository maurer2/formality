<template>
  <div id="app" class="app">
    <Form />
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
});
</script>

<style lang="scss">
// @import '~normalize-scss';
@import '~sanitize.css';
@import '~sanitize.css/forms.css';

// @include normalize();

html {
  min-height: 100%;
  font-size: 16px;
}

body {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.visually-hidden {
  position: absolute;
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  border: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>

<style lang="scss" scoped>
.app {
  min-height: inherit; // https://stackoverflow.com/a/43669966

  // dummy
  display: flex;
  margin: auto;
  padding: 1.5rem;
  max-width: 500px;
}
</style>
