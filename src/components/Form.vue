<template>
  <form
    class="form"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <Email v-model.trim="formValues.email"/>

    <Password v-model.trim="formValues.password"/>

    <Indicator :calculatedStrength="calculatedStrength" />

    <div class="button-group">
      <Button class="button" type="reset" />
      <Button class="button" type="submit" />
    </div>

    <fieldset class="debug">
      <legend>Debug:</legend>
      <output class="output">{{ $data }}</output>
    </fieldset>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

import Email from './Email.vue';
import Password from './Password.vue';
import Button from './Button.vue';
import Indicator from './Indicator.vue';

import passwordStrength from '../services/password-strength';

export default Vue.extend({
  name: 'Form',
  components: {
    Button,
    Email,
    Password,
    Indicator,
  },
  props: {},
  data() {
    return {
      formValues: {
        email: '' as string,
        password: '' as string,
      },
      formIsValid: false as boolean,
      calculatedStrength: -1 as number,
      passwordFeedback: {},
    };
  },
  methods: {
    handleReset(): void {
      console.log('reset');

      const entries = Object.entries(this.formValues);
      const newFormValuesNested = entries.map(([key]) => {
        const newValue = {
          [key]: '',
        };

        return newValue;
      });
      const newFormValues = Object.assign({}, ...newFormValuesNested);

      this.formValues = newFormValues;
      this.calculatedStrength = -1;
      this.passwordFeedback = {};
    },
    handleSubmit(): void {
      const { password } = this.formValues;
      const passwordCalculations = passwordStrength.getPasswordStrength(password);

      console.log('submit', passwordCalculations);

      this.calculatedStrength = passwordCalculations.score;
      this.passwordFeedback = passwordCalculations.feedback;
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
    "submit reset";
  grid-template-rows:
    min-content
    min-content
    min-content;
  width: 100%;
  margin: auto;
  padding: 1.5rem;
  border: 1px solid black;
}

.button-group {
  display: flex;
}

.button {
  flex: 1;
}

.debug {
  display: block;
  margin-top: 1.5rem;
  max-width: 50ch;
  overflow: scroll;
}

.output {
  white-space: pre;
}

</style>
