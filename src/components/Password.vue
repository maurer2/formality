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
        for="password"
      >
        <span class="text">
          Password
        </span>
      </label>
      <div class="input-group">
        <input
          id="password"
          :type="fieldType"
          class="input"
          placeholder="Password"
          name="password"
          autocomplete="off"
          :value="modelValue"
          size="25"
          @input="updateValue"
        >
        <button
          class="toggle-button"
          :class="{ 'toggle-button--is-disabled': toggleButtonIsDisabled }"
          type="button"
          :disabled="toggleButtonIsDisabled"
          @click="handleButtonToggle"
        >
          <template v-if="isObfuscated">
            <span class="visually-hidden">
              Show password
            </span>
            <span class="icon">
              <EyeIcon />
            </span>
          </template>
          <template v-else>
            <span class="visually-hidden">
              Hide password
            </span>
            <span class="icon">
              <EyeDisabledIcon />
            </span>
          </template>
        </button>
        <button
          class="clear-button"
          :class="{'clear-button--is-disabled': clearButtonIsDisabled}"
          :disabled="clearButtonIsDisabled"
          @click="handleInputReset"
        >
          Clear
        </button>
      </div>
      <div class="criteria">
        <PasswordCriterion
          text="Text"
          :is-fullfilled="true"
        />
        <PasswordCriterion
          text="Text"
          :is-fullfilled="false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

import PasswordCriterion from './Password-Criterion.vue';

import EyeIcon from '../../public/eye.svg';
import EyeDisabledIcon from '../../public/eye-disabled.svg';

export default defineComponent({
  name: 'Password',
  components: {
    PasswordCriterion,
    EyeIcon,
    EyeDisabledIcon,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hasBeenInteractedWith: false as boolean,
      isObfuscated: true as boolean,
    };
  },
  computed: {
    fieldType(): string {
      return (this.isObfuscated) ? 'password' : 'text';
    },
    isValid(): boolean {
      return false;
    },
    clearButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
    toggleButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
  },
  methods: {
    handleButtonToggle() {
      this.isObfuscated = !this.isObfuscated;
    },
    handleInputReset(): void {
      this.$emit('update:modelValue', '');
    },
    updateValue(event: Event): void {
      const { target } = event;

      if (target === null) {
        return;
      }

      const newValue: string = (target as HTMLInputElement).value;

      this.$emit('update:modelValue', newValue);
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
  align-self: top;
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

.toggle-button,
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
