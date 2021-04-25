<template>
  <form
    class="form"
    novalidate="novalidate"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <fieldset class="fields">
      <!-- eslint-disable -->
      <Email v-model.gmail.trim="formValues.email" />
      <Password v-model.trim="formValues.password" />
    </fieldset>

    <fieldset class="controls">
      <Indicator :value="calculatedStrength" />
      <div class="button-group">
        <Button
          class="button button-reset"
          type="reset"
          :is-disabled="!formIsValid"
        />
        <Button
          class="button button-submit"
          type="submit"
          :is-disabled="!formIsValid"
        />
      </div>
    </fieldset>
    <fieldset class="debug">
      <legend>Debug:</legend>
      <output class="output">{{ $data }}</output>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

import Email from './Email.vue';
import Password from './Password.vue';
import Button from './Button.vue';
import Indicator from './Indicator.vue';

import { getPasswordStrength } from '../services/password-strength';

export default defineComponent({
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

        const passwordStrength = getPasswordStrength(password);

        this.calculatedStrength = passwordStrength;
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
  grid-auto-rows: auto;
  grid-auto-columns: 1fr;
  grid-auto-flow: row dense;

  /*
  grid-template-areas:
    "email-field ."
    "password-field ."
    "indicator ."
    "form-buttons .";
  grid-template-rows:
    auto
    auto
    auto
    auto;
  */
  //grid-template-columns: minmax(auto, 250px) 1fr;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.fields,
.controls {
  display: block;
  border: none;
}

.button-group {
  display: flex;
  // grid-column: 2;
  align-self: start;
  // grid-area: form-buttons;

  .button {
    flex-grow: 1;
  }
}

.debug {
  display: block;
  // grid-row: 10;
  grid-column: 1;
  // grid-column: 1/-1;
  overflow: scroll;
  font-size: 16px;
}

.output {
  white-space: pre;
}

</style>
