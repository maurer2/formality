<template>
  <div class="wrapper">
    <img
      v-if="showErrors"
      src="../assets/error.png"
      class="validity-icon"
      alt=""
    >
    <div class="field field-row field-row-stacked">
      <label
        class="label"
        for="password"
      >
        <span class="text">
          Password
        </span>
      </label>
      <div class="input-button-group">
        <input
          id="password"
          :type="fieldType"
          class="input"
          placeholder="Enter password"
          autocomplete="new-password"
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
            <EyeIcon class="icon" />
          </template>
          <template v-else>
            <span class="visually-hidden">
              Hide password
            </span>
            <EyeDisabledIcon class="icon" />
          </template>
        </button>
        <button
          class="clear-button"
          :class="{'clear-button--is-disabled': clearButtonIsDisabled}"
          :disabled="clearButtonIsDisabled"
          @click="resetValue"
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
import { defineComponent, PropType } from 'vue';

import PasswordCriterion from './Password-Criterion.vue';

import EyeIcon from '../../public/eye.svg';
import EyeDisabledIcon from '../../public/eye-disabled.svg';

type fieldType = 'password' | 'text';

export default defineComponent({
  name: 'Password',
  components: {
    PasswordCriterion,
    EyeIcon,
    EyeDisabledIcon,
  },
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
    modelModifiers: {
      type: Object,
      default: () => { /**/ },
    },
    // https://technology.blog.gov.uk/2021/04/19/simple-things-are-complicated-making-a-show-password-option/
    shouldForcePasswordObfuscation: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isObfuscated: true,
      isDirty: false,
      // isUntouched: true,
      // isPristine: true,
      validationRules: [],
    };
  },
  computed: {
    fieldType(): fieldType {
      if (this.shouldForcePasswordObfuscation) {
        // return 'password';
      }

      return (this.isObfuscated) ? 'password' : 'text';
    },
    isValid(): boolean {
      return true;
    },
    clearButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
    toggleButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
    showErrors(): boolean {
      return this.isDirty && !this.isValid;
    },
  },
  watch: {
    shouldForcePasswordObfuscation(newShouldForcePasswordObfuscation: boolean): void {
      if (!newShouldForcePasswordObfuscation) {
        return;
      }

      this.isObfuscated = true;
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
      this.isDirty = true;
    },
    resetValue(): void {
      this.$emit('update:modelValue', '');
      this.isDirty = false;
    },
    handleButtonToggle() {
      this.isObfuscated = !this.isObfuscated;
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
  flex-grow: 1;
  align-items: stretch;
}

.label {
  margin-left: 6px;
}

.input-button-group {
  display: flex;
  align-items: baseline;
}

.input {
  flex-grow: 1;
  margin-right: 6px;
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

  &:active {
    padding: inherit;
  }

  .icon {
    margin: 0;
  }
}

</style>
