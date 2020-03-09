<template>
  <form
    class="form"
    @submit.prevent="handleSubmit"
    @reset="handleReset"
  >
    <slot />
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Form',
  props: {},
  methods: {
    handleReset(): void {
      console.log('reset');
    },
    handleSubmit(): void {
      console.log('submit');
    },
  },
});
</script>

<style scoped lang="scss">
.form {
  display: grid;
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
  margin: auto;
  padding: 1.5rem;
  width: 100%;
  border: 1px solid black;

}

</style>
