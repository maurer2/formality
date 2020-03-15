<template>
  <div class="indicator">
    <meter
      class="meter"
      :value="valueMapped"
      min="0"
      max="3"
      id="meter"
    >
    </meter>
    <label for="meter">
      <span class="text">
        Password strength:
      </span>
      <output class="value" for="meter">
        {{ valueMapped }}
      </output>
    </label>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Indicator',
  props: {
    calculatedStrength: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    valueMapped(): number {
      return this.calculatedStrength;
    },
  },
});
</script>

<style scoped lang="scss">
.meter {
  display: block;
  width: auto;
}

</style>
