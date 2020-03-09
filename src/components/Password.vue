<template>
  <div class="field">
    <label class="label" for="email">
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
      id="email"
      name="email"
      v-model.trim="value"
      autocomplete="off"
    />
    <button type="button" @click="toggleInputType">
      <template v-if="isClearText">
        Hide password
      </template>
      <template v-else>
        Show password
      </template>
    </button>

  </div>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Password',
  props: {},
  data() {
    return {
      value: 'PASS' as string,
      isValid: true as boolean,
      hasBeenInteractedWith: false as boolean,
      isClearText: false as boolean,
    };
  },
  methods: {
    toggleInputType() {
      this.isClearText = !this.isClearText;
    },
  },
  computed: {
    fieldType(): string {
      return (this.isClearText) ? 'text' : 'password';
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
