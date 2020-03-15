<template>
  <div class="indicator">
    <label for="meter">
      Password strength
    </label>
    <div class="element-group">
      <meter
        class="meter"
        :value="valueMapped"
        min="0"
        max="3"
        id="meter"
      >
      </meter>
      <output class="output" for="meter">
        {{ valueMapped }}
      </output>
    </div>
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
.indicator {
  margin-bottom: 1rem;
}

.element-group {
  display: flex;
  align-items: center;
}

.meter {
  display: block;
  flex: 1;
  background: #c3c3c3;
  appearance: none;
}

.output {
  margin-left: 0.5rem;
}

</style>
