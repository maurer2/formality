<template>
  <div class="field">
    <label class="label" for="email">
      <span class="text">
        Email
      </span>
      <span class="validity-icon">
        {{ isValid ? '✓' : 'x' }}
      </span>
    </label>
    <input
      type="email"
      class="input"
      placeholder="E-Mail"
      id="email"
      name="email"
      v-model.trim="value"
      autocomplete="off"
    />
  </div>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Email',
  props: {},
  data() {
    return {
      value: '' as string,
      isValid: true as boolean,
      hasBeenInteractedWith: false as boolean,
    };
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
