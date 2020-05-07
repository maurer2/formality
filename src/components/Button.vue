<template>
  <button
    class="button"
    :class="{'button--is-disabled': isDisabled}"
    :type="type"
    :disabled="isDisabled"
  >
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
    isDisabled: {
      type: Boolean,
      required: true,
      default: false,
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
.button {
  &--is-disabled,
  :not([disabled]) {
    cursor: pointer;
  }
}

</style>
