<template>
  <button :type="type">
    <template v-if="isSubmitButton">
      Submit
    </template>
    <template v-else>
      Reset
    </template>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';

type ButtonTypes = {
  submit: string;
  button: string;
  reset: string;
}

type buttonType = Pick<ButtonTypes, 'submit' | 'reset'>;

export default Vue.extend({
  name: 'Button',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    isSubmitButton(): boolean {
      return this.type === 'submit';
    },
  },
});

</script>

<style scoped lang="scss">
.dummy {
  color: red;
}

</style>
