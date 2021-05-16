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
        for="email"
      >
        <span class="text">
          Email
        </span>
      </label>
      <div class="input-group">
        <input
          id="email"
          type="search"
          class="input"
          placeholder="Enter email"
          autocomplete="off"
          :value="modelValue"
          size="25"
          @input="updateValue"
          @blur="setTouchedState"
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
      <div v-if="showErrors">
        Error
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// eslint-disable-next-line no-useless-escape
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default defineComponent({
  name: 'Email',
  props: {
    modelValue: {
      type: String,
      required: true,
      default: '',
    },
    modelModifiers: {
      type: Object,
      default: () => ({
        trim: true,
        gmail: false,
      }) as Record<string, boolean>,
    },
  },
  emits: ['update:modelValue'],
  data() {
    // https://stackoverflow.com/a/55552235/1870482
    /*
    valid,
    invalid,
    pristine: This property returns true if the element’s contents have not been changed.
    dirty: This property returns true if the element’s contents have been changed.
    untouched: This property returns true if the user has not visited the element.
    touched: This property returns true if the user has visited the element.
    */
    return {
      initalValueModelValue: '',
      isTouched: false,
      validationRules: [],
    };
  },
  computed: {
    isPristine(): boolean {
      // angular doesn't revert to pristine when setting value back to initial value
      return this.modelValue === this.initalValueModelValue;
    },
    isValid(): boolean {
      return emailRegex.test(this.modelValue);
    },
    isPrefilled(): boolean {
      return !!this.initalValueModelValue.length;
    },
    clearButtonIsDisabled(): boolean {
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
  mounted() {
    this.initalValueModelValue = this.modelValue;
  },
  methods: {
    setTouchedState(): void {
      this.isTouched = true;
    },
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

.input-group {
  display: flex;
  align-items: baseline;
}

.input {
  flex-grow: 1;
  margin-right: 6px;

  // copy styles from other inputs
  &[type=search] {
    box-sizing: border-box;
    height: 21px;
    padding: 3px 4px;
    border: none;
    border-radius: 0;
    line-height: 2;
    background-color: #fff;
    outline: none;
    box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
    appearance: none;

    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }
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

code pre {
  white-space: pre-line;
}

</style>
