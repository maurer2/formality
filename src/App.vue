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
@import '~sanitize.css';
@import '~sanitize.css/forms.css';

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
  // dummy
  display: flex;
  max-width: 555px;
  min-height: inherit; // https://stackoverflow.com/a/43669966
  margin: auto;
  padding: 1.5rem;
}
</style>
