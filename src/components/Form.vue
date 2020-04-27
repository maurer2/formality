<template>
  <form
    class="form"
    novalidate="novalidate"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <Email v-model.trim="formValues.email" />

    <Password v-model.trim="formValues.password" />

    <Indicator :value="calculatedStrength" />

    <div class="button-group">
      <Button
        class="button"
        type="reset"
      />
      <Button
        class="button"
        type="submit"
      />
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

import { getPasswordStrength } from '../services/password-strength';

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
      calculatedStrength: 0 as number,
      passwordFeedback: {},
    };
  },
  watch: {
    formValues: {
      handler(newFormValues) {
        const { password, email }: { password: string; email: string } = newFormValues;
        const passwordCalculations = getPasswordStrength(password, [email]);

        const { score, feedback } = passwordCalculations;
        this.calculatedStrength = score;
        // this.passwordFeedback = passwordCalculations.feedback;
      },
      deep: true,
    },
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
      this.calculatedStrength = 0;
      this.passwordFeedback = {};
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
    "submit reset";
  grid-template-rows:
    min-content
    min-content
    min-content;
  width: 100%;
  margin: auto;
}

.button-group {
  display: flex;
}

.button {
  flex: 1;
}

.debug {
  display: block;
  max-width: 50ch;
  margin-top: 1.5rem;
  overflow: scroll;
}

.output {
  white-space: pre;
}

</style>
