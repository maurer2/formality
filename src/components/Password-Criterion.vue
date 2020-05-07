<template>
  <p
    class="criteria"
    :class="{ 'criteria--is-fullfilled': isFullfilled }"
  >
    <span class="icon">
      Icon
    </span>
    <span class="text">
      {{ text }}
    </span>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PasswordCriterion',
  props: {
    isFullfilled: {
      type: Boolean,
      required: true,
      default: false,
    },
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
});

</script>

<style scoped lang="scss">
.criteria {
  color: red;

  &--is-fullfilled {
    color: green;
  }
}

</style>
