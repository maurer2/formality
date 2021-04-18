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
      :class="meterClass"
      :value="value"
      min="0"
      max="4"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

const valueMap: { [key: string]: string} = {
  0: 'invalid',
  1: 'weak',
  2: 'average',
  3: 'strong',
  4: 'very strong',
};

export default defineComponent({
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
    meterClass(): string {
      return `meter--state-${this.value}`;
    },
  },
});
</script>

<style scoped lang="scss">
.indicator {
  // grid-column: 2;
  // grid-area: indicator;
  margin-bottom: 1rem;
}

.label {
  display: flex;
}

.output {
  margin-left: auto;
}

.meter {
  $width-gutter: 0.75rem;
  $number-of-bars: 4;

  position: relative;
  display: block;
  width: calc(100% + #{$width-gutter});
  height: 5px;
  overflow: hidden; // hide pseudo elements
  appearance: none;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    background-size: percentage(1 / $number-of-bars);
    content: '';
  }

  // gray default bar with gutter
  &::before {
    left: 0;
    background-image:
      linear-gradient(
        to right,
        gray 0%,
        gray calc(100% - #{$width-gutter}),
        transparent calc(100% - #{$width-gutter}),
        transparent 100%
      );
  }

  // red active bar with gutter
  &::after {
    left: -100%;
    background-image:
      linear-gradient(
        to right,
        red 0%,
        red calc(100% - #{$width-gutter}),
        transparent calc(100% - #{$width-gutter}),
        transparent 100%
      );
    transform: translateX(0);
    will-change: transform;
  }

  @for $i from 0 through $number-of-bars {
    $shift: percentage($i / $number-of-bars);

    &.meter--state-#{$i}::after {
      transform: translateX(#{$shift});
    }
  }
}

.description {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 7.5rem 0;
}

.key {
  margin-right: 0.5rem;
}

.value {
  margin: 0;
  font-weight: bold;
}

</style>
