<template>
  <form class="form">
    <slot />
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Form',
  props: {},
});
</script>

<style scoped lang="scss">
.form {
  display: grid;
  min-height: inherit;
  grid-template-areas:
    "email-field"
    "password-field"
    "feedback"
    "submit reset"
  ;
  grid-template-rows:
    min-content
    min-content
    min-content
  ;
  border: 1px solid black;
  align-content: center;
  align-items: center;
  justify-items: center;

  // dummy
  max-width: 500px;
  margin: auto;
  height: fit-content;
}

</style>
