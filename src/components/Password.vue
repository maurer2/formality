<template>
  <div class="field">
    <label
      class="label"
      for="password"
    >
      <span class="text">
        Password
      </span>
      <span class="validity-icon">
        {{ isValid ? '✓' : 'x' }}
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
        :value="value"
        @input="updateValue"
      >
      <button
        class="button"
        :class="{ 'button--is-disabled': toggleButtonIsDisabled }"
        type="button"
        :disabled="toggleButtonIsDisabled"
        @click="toggleInputType"
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import EyeIcon from '../../public/eye.svg';
import EyeDisabledIcon from '../../public/eye-disabled.svg';

export default Vue.extend({
  name: 'Password',
  components: {
    EyeIcon,
    EyeDisabledIcon,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isValid: true as boolean,
      hasBeenInteractedWith: false as boolean,
      isObfuscated: true as boolean,
    };
  },
  computed: {
    fieldType(): string {
      return (this.isObfuscated) ? 'password' : 'text';
    },
    toggleButtonIsDisabled(): boolean {
      return this.value === '';
    },
  },
  methods: {
    toggleInputType() {
      this.isObfuscated = !this.isObfuscated;
    },
    updateValue(event: Event): void {
      const { target }: { target: EventTarget | null } = event;

      if (target === null) {
        return;
      }

      const newValue: string = (target as HTMLInputElement).value;

      this.$emit('input', newValue);
    },
  },

});
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
}

.input {
  flex-grow: 1;
  margin-right: 0.5rem;
}

.button {
  flex-grow: 0;
  padding: 2px;
  // all: unset;
  // border: 1px solid #a0a0a0;

  &--is-disabled {
    cursor: not-allowed;
    opacity: 0.25;
  }
}

</style>
