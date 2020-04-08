<template>
  <div class="field">
    <label
      class="label"
      for="email"
    >
      <span class="text">
        Email
      </span>
      <span class="validity-icon">
        {{ isValid ? '✓' : 'x' }}
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
        :value="value"
        @input="updateValue"
      >
      <button
        v-if="showClearIcon"
        class="input-addon-button"
        @click="handleInputReset"
      >
        Clear
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Email',
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
    };
  },
  computed: {
    showClearIcon(): boolean {
      // hasBeenInteractedWith
      return this.value.length > 0;
    },
  },
  methods: {
    updateValue(event: Event): void {
      const { target }: { target: EventTarget | null } = event;

      if (target === null) {
        return;
      }

      const newValue: string = (target as HTMLInputElement).value;

      this.$emit('input', newValue);
    },
    handleInputReset(): void {
      this.$emit('input', '');
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
  position: relative;
  display: flex;
}

.input {
  flex-basis: 100%;
}

.input-addon-button {
  position: absolute;
  right: 0.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  flex-shrink: 0;
  align-self: center;
  cursor: pointer;
}

</style>
