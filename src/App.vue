<template>
  <div id="app" class="app">
    <Form>
      <Email/>
      <Password />
      <Meter />
      <Button type="reset" />
      <Button type="submit" />
    </Form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Form from './components/Form.vue';
import Email from './components/Email.vue';
import Password from './components/Password.vue';
import Button from './components/Button.vue';
import Meter from './components/Meter.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Form,
    Button,
    Email,
    Password,
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

  // dummy
  display: flex;
  margin: auto;
  padding: 1.5rem;
  max-width: 500px;
}
</style>
