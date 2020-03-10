<template>
  <div class="field">
    <label class="label" for="password">
      <span class="text">
        Password
      </span>
      <span class="validity-icon">
        {{ isValid ? '✓' : 'x' }}
      </span>
    </label>
    <input
      :type="fieldType"
      class="input"
      placeholder="Password"
      id="password"
      name="password"
      autocomplete="off"
      :value="value"
      @input="updateValue"
    />
    <button type="button" @click="toggleInputType">
      <template v-if="isObfuscated">
        Show password
      </template>
      <template v-else>
        Hide password
      </template>
    </button>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Password',
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
  margin-bottom: 1rem;
  flex-direction: column;
}

</style>
