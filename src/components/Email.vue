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
          placeholder="Enter email"
          autocomplete="off"
          :value="modelValue"
          size="25"
          @change="updateValue"
        >
        <button
          class="clear-button"
          :class="{'clear-button--is-disabled': clearButtonIsDisabled}"
          :disabled="clearButtonIsDisabled"
          @click="resetValue"
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
    modelModifiers: {
      type: Object,
      default: () => { /**/ },
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isDirty: false,
      validationRules: [],
    };
  },
  computed: {
    isValid(): boolean {
      return emailRegex.test(this.modelValue);
    },
    clearButtonIsDisabled(): boolean {
      return !this.modelValue;
    },
    showErrors(): boolean {
      return this.isDirty && !this.isValid;
    },
  },
  mounted() {
    this.isDirty = false;
  },
  methods: {
    updateValue(event: InputEvent): void {
      const { target } = event;

      if (target === null) {
        return;
      }

      let newValue = (target as HTMLInputElement).value;

      if ('gmail' in (this.modelModifiers)) {
        newValue = newValue.replace(/googlemail/ig, 'gmail');
      }

      this.$emit('update:modelValue', newValue);
      this.isDirty = true;
    },
    resetValue(): void {
      this.$emit('update:modelValue', '');
      this.isDirty = false;
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

.input-group {
  display: flex;
  align-items: baseline;
}

.input {
  flex-grow: 1;
  margin-right: 6px;
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
