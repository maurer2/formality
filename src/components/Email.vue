<template>
  <div class="wrapper">
    <template v-if="!isValid">
      <img
        src="../assets/error.png"
        class="validity-icon"
        alt=""
      >
    </template>
    <div class="field field-row field-row-stacked">
      <label
        class="label"
        for="email"
      >
        <span class="text">
          Email
        </span>
      </label>
      <div class="input-group">
        <input
          id="email"
          type="email"
          class="input"
          placeholder="E-Mail"
          name="email"
          autocomplete="off"
          :value="value"
          @input="updateValue"
        >
        <button
          class="input-addon-button"
          :disabled="clearIconIsEnabled"
          @click="handleInputReset"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// eslint-disable-next-line no-useless-escape
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

export default Vue.extend({
  name: 'Email',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hasBeenInteractedWith: false as boolean,
    };
  },
  computed: {
    isValid(): boolean {
      return emailRegex.test(this.value);
    },
    clearIconIsEnabled(): boolean {
      return !(this.value);
    },

  },
  methods: {
    updateValue(event: Event): void {
      const { target }: { target: EventTarget | null } = event;

      if (target === null) {
        return;
      }

      const newValue: string = (target as HTMLInputElement).value;

      this.$emit('input', newValue);
    },
    handleInputReset(): void {
      this.$emit('input', '');
    },
  },

});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.validity-icon {
  display: block;
  align-self: center;
  width: 50px;
  height: 50px;
  margin: 0;
  padding: 0;
  object-fit: contain;
  image-rendering: pixelated;
}

.field {
  align-items: flex-start;
}

.label {
  margin-left: 6px;
}

.input-group {
  position: relative;
  display: flex;
}

.input {
  margin-right: 1rem;
}

.input-addon-button {
  margin-top: 0;
  padding: 0 0.5rem;
  border: 0;
  font-size: 0.85rem;
  line-height: 1;
  background: transparent;
  cursor: pointer;
}

</style>
