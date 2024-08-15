<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps<{
  isModalViewable: boolean;
  message: string;
}>();

const emit = defineEmits(["close"]);

// Computed property to work with the modal visibility
const isModalVisible = computed(() => props.isModalViewable);

// Method to handle the close action
const closePopup = () => {
  emit("close");
};
</script>

<template>
  <div
    v-if="isModalVisible"
    class="popup"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="popup-message"
  >
    <p id="popup-message" class="popup-message">{{ message }}</p>
    <button class="popup-confirm" @click="closePopup">확인</button>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 330px;
  padding: 20px;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 15px;
  text-align: center;
  z-index: 1000;

  @media (min-width: 500px) {
    max-width: 330px;
    height: 150px;
  }
}

.popup-message {
  font-size: var(--title-medium-font-size);
  color: var(--text-fourth);
  font-weight: bold;
  margin-bottom: 50px; /* Adjusted to allow space above the button */
}

.popup-confirm {
  width: 270px;
  height: 50px;
  border: 2px solid var(--button-primary);
  border-radius: 15px;
  background-color: transparent;
  color: var(--text-primary);
  font-size: var(--button-large-font-size);
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
}

.popup-confirm:hover {
  background-color: var(--button-primary);
  color: var(--text-secondary);
}
</style>
