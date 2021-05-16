<template>
  <div class="wrapper">
    <img
      v-if="showErrors"
      src="../assets/error.png"
      class="validity-icon"
      alt=""
    >
    <div class="field field-row field-row-stacked">
      <code>
        <pre>
          isPristine: {{ Boolean(isPristine) }}
          isTouched {{ Boolean(isTouched) }}
          isValid {{ Boolean(isValid) }}
          showErrors: {{ Boolean(showErrors) }}
          isPrefilled {{ Boolean(isPrefilled) }}
        </pre>
      </code>
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
          @blur="setTouchedState"
        >
        <button
          class="toggle-button"
          :class="{ 'toggle-button--is-disabled': toggleButtonIsDisabled }"
          type="button"
          :disabled="toggleButtonIsDisabled"
          @click="handleToggleButtonClick"
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
      <div v-if="showErrors">
        Error
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
      default: () => ({ /**/ }) as Record<string, boolean>,
    },
    // https://technology.blog.gov.uk/2021/04/19/simple-things-are-complicated-making-a-show-password-option/
    submitIsTriggered: {
      type: Boolean as PropType<boolean>,
      required: true,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isObfuscated: true,
      initalValueModelValue: '',
      isTouched: false,
      validationRules: [],
    };
  },
  computed: {
    fieldType(): fieldType {
      return (this.isObfuscated) ? 'password' : 'text';
    },
    isPristine(): boolean {
      // angular doesn't revert to pristine when setting value back to initial value
      return this.modelValue === this.initalValueModelValue;
    },
    isValid(): boolean {
      return this.modelValue.length >= 3; // temp
    },
    isPrefilled(): boolean {
      return !!this.initalValueModelValue.length;
    },
    clearButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
    toggleButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
    showErrors(): boolean {
      if (this.isValid) {
        return false;
      }

      // always show errors when prefilled content is invalid
      if (this.isPrefilled) {
        return true;
      }

      // show error when field has lost focus at least once and the content has changed
      if (this.isTouched && !this.isPristine) {
        return true;
      }

      return false;
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
  mounted() {
    this.initalValueModelValue = this.modelValue;
  },
  methods: {
    setTouchedState(): void {
      this.isTouched = true;
    },
    handleToggleButtonClick() {
      this.isObfuscated = !this.isObfuscated;
    },
    updateValue(event: Event): void {
      const { target } = event;

      if (target === null) {
        return;
      }

      const newValue: string = (target as HTMLInputElement).value;

      this.$emit('update:modelValue', newValue);
    },
    resetValue(): void {
      this.initalValueModelValue = '';
      this.isTouched = false;

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

code pre {
  white-space: pre-line;
}

</style>
