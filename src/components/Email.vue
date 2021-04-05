<template>
  <div class="wrapper">
    <template v-if="!isValid">
      <img
        src="../assets/error.png"
        class="validity-icon"
        alt=""
      >
    </template>
    <div class="field field-row field-row-stacked">
      <label
        class="label"
        for="email"
      >
        <span class="text">
          Email
        </span>
      </label>
      <div class="input-group">
        <input
          id="email"
          type="email"
          class="input"
          placeholder="E-Mail"
          name="email"
          autocomplete="off"
          :value="modelValue"
          size="25"
          @input="updateValue"
        >
        <button
          class="clear-button"
          :class="{'clear-button--is-disabled': clearButtonIsDisabled}"
          :disabled="clearButtonIsDisabled"
          @click="handleInputReset"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

// eslint-disable-next-line no-useless-escape
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default defineComponent({
  name: 'Email',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hasBeenInteractedWith: false as boolean,
    };
  },
  computed: {
    isValid(): boolean {
      return emailRegex.test(this.modelValue);
    },
    clearButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
  },
  methods: {
    updateValue(event: Event): void {
      const { target } = event;

      if (target === null) {
        return;
      }

      const newValue: string = (target as HTMLInputElement).value;

      this.$emit('update:modelValue', newValue);
    },
    handleInputReset(): void {
      this.$emit('update:modelValue', '');
    },
  },

});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.validity-icon {
  display: block;
  align-self: center;
  width: 50px;
  height: 50px;
  margin: 0;
  padding: 0;
  object-fit: contain;
  image-rendering: pixelated;
}

.field {
  align-items: flex-start;
}

.label {
  margin-left: 6px;
}

.input-group {
  display: flex;
}

.input {
  margin-right: 1rem;
}

.clear-button {
  margin-top: 0;
  padding: 0 0.5rem;
  border: 0;
  line-height: 1;
  background: transparent;

  &--is-disabled,
  :not([disabled]) {
    cursor: pointer;
  }
}

</style>
