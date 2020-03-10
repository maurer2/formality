<template>
  <form
    class="form"
    @submit.prevent="handleSubmit"
    @reset="handleReset"
  >
    <Email v-model="formValues.email"/>

    <Password v-model="formValues.password"/>
    <Meter />
    <Button type="reset" />
    <Button type="submit" />

    <fieldset class="debug">
      <legend>Debug:</legend>
      <output class="output">
        {{ formValues }}
      </output>
    </fieldset>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

import Email from './Email.vue';
import Password from './Password.vue';
import Button from './Button.vue';
import Meter from './Meter.vue';

export default Vue.extend({
  name: 'Form',
  components: {
    Button,
    Email,
    Password,
    Meter,
  },
  props: {},
  data() {
    return {
      formValues: {
        email: '' as string,
        password: '' as string,
      },
      formIsValid: false as boolean,
    };
  },
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

.debug {
  margin-top: 1.5rem;
}

.output {
  white-space: pre;
}

</style>
