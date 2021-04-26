<template>
  <form
    class="form"
    novalidate="novalidate"
    @submit.prevent="handleSubmit"
    @reset.prevent="handleReset"
  >
    <fieldset class="fields">
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
      <output class="output">{{ $data }}</output>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.fields,
.controls,
.debug {
  all: unset;
}

.button-group {
  display: flex;
  align-self: start;

  .button {
    flex-grow: 1;
  }
}

.debug {
  display: block;
  overflow: scroll;
  font-size: 16px;
}

.output {
  display: block;
  white-space: pre;
}

</style>
