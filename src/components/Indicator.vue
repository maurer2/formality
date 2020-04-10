<template>
  <div class="indicator">
    <label
      class="label"
      for="meter"
    >
      <span class="text">
        Password strength
      </span>
      <output
        v-if="valueMapped"
        class="output"
        for="meter"
      >
        <span>{{ valueMapped }}</span>
      </output>
    </label>
    <meter
      id="meter"
      class="meter"
      :value="value"
      min="0"
      max="4"
      :style="meterOverlayStyle"
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
    meterOverlayStyle(): any {
      const value = 100 * this.value;

      console.log(value);

      return {
        cursor: 'pointer',
      };

      // return `${this.value}%`;
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

$width-gutter: 0.75rem;

.meter {
  position: relative;
  display: block;
  // width: 100%;
  width: calc(100% + #{$width-gutter});
  // background: gray;
  appearance: none;
  overflow: hidden; // hide pseudo elements
}

.meter:before {
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(to right, gray 0%, gray calc(100% - #{$width-gutter}), transparent calc(100% - #{$width-gutter}), transparent 100%);
  //background-size: calc(#{percentage(1/3)} + #{$width-gutter});
  background-size: calc(#{percentage(1/3)} + 0rem);
}

.meter:after {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  // content: attr(value);
  content: '';
  // background-image: linear-gradient(to right, transparent 0%, transparent calc(50% - 0.75rem), blue calc(50% - 0.75rem), blue 50%, blue 100%);
  background-image: linear-gradient(to right, red 0%, red calc(100% - #{$width-gutter}), transparent calc(100% - #{$width-gutter}), transparent 100%);
  // background-size: calc(#{percentage(1/3)} + #{$width-gutter});
  background-size: calc(#{percentage(1/3)} + 0rem);
}

.description {
  display: flex;
  margin: 0 0 7.5rem 0;
  flex-wrap: wrap;
}

.key {
  margin-right: 0.5rem;
}

.value {
  margin: 0;
  font-weight: bold;
}


</style>
