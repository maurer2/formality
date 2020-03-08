<template>
  <div id="app" class="app">
    <Form>
      <Field />
      <Field />
      <Meter />
      <Button />
      <Button />
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Form from './components/Form.vue';
import Button from './components/Button.vue';
import Field from './components/Field.vue';
import Meter from './components/Meter.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Form,
    Button,
    Field,
    Meter,
  },
});
</script>

<style lang="scss">
@import '~normalize-scss';
@import '~sanitize.css';

@include normalize();

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

</style>

<style lang="scss" scoped>
.app {
  min-height: inherit; // https://stackoverflow.com/a/43669966
}
</style>
