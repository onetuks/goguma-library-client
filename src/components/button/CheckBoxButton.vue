<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  value: Boolean,
  checked: Boolean,
  id: String,
  disabled: Boolean,
});

const emits = defineEmits(["update:checked"]);

const toggle = () => {
  emits("update:checked", !props.checked);
};
</script>

<template>
  <div class="checkbox-container" @click="toggle">
    <input
      type="checkbox"
      :id="id"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @change="toggle"
      class="checkbox-input"
    />
    <span class="custom-checkbox"></span>
    <slot></slot>
  </div>
</template>

<style scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-input {
  display: none;
}

.custom-checkbox {
  width: 15px;
  height: 15px;
  background-image: url("@/assets/icon/checkbox/unchecked-icon.png");
  background-size: cover;
  display: inline-block;
  margin-right: 8px;
}

.checkbox-input:checked + .custom-checkbox {
  background-image: url("@/assets/icon/checkbox/checked-icon.png");
}
</style>
