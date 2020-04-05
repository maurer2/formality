<template>
  <div class="indicator">
    <label class="label" for="meter">
      <span class="text">
        Password strength
      </span>
      <output class="output" for="meter" v-if="valueMapped">
        <span>{{ valueMapped }}</span>
      </output>
    </label>
    <meter
      class="meter"
      :value="value"
      min="0"
      max="4"
      id="meter"
    />
  </div>

</template>

<script lang="ts">
import Vue from 'vue';

const valueMap: { [key: string]: string} = {
  0: 'invalid',
  1: 'weak',
  2: 'average',
  3: 'strong',
  4: 'very strong',
};

export default Vue.extend({
  name: 'Indicator',
  props: {
    value: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    valueMapped(): string {
      if (!(this.value in valueMap)) {
        return '';
      }

      return valueMap[this.value];
    },
    isDisabled(): boolean {
      return this.value === 0;
    },
  },
});
</script>

<style scoped lang="scss">
.indicator {
  margin-bottom: 1rem;
}

.label {
  display: flex;
}

.output {
  margin-left: auto;
}

.meter {
  display: block;
  width: 100%;
  background: #c3c3c3;
  // appearance: none;
}

</style>
