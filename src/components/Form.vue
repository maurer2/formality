<template>
  <form
    class="form"
    novalidate="novalidate"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <!-- eslint-disable -->
    <Email v-model.gmail.trim="formValues.email" />

    <Password v-model.trim="formValues.password" />

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
  grid-template-areas:
    "email-field email-field"
    "password-field password-field"
    "indicator indicator"
    "form-buttons form-buttons";
  grid-template-columns: 1fr 1fr;
  grid-template-rows:
    auto
    auto
    auto
    auto;
  grid-auto-columns: 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: row;
}

.button-group {
  display: flex;
   grid-area: form-buttons;
}

.debug {
  display: block;
  margin-top: 1.5rem;
  overflow: scroll;
  font-size: 16px;
  grid-column: 1/-1;
}

.output {
  white-space: pre;
}

</style>
