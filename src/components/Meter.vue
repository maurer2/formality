<template>
  <meter
    value="5" min="0" max="10"
  >
    Meter
  </meter>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Meter',
  props: {},
});
</script>

<style scoped lang="scss">
.dummy {
  color: red;
}

</style>
