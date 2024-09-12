<script setup lang="ts">
import { ConfirmModalInfo } from "@/types/Modal";

defineProps<{
  confirmModalInfo: ConfirmModalInfo;
}>();

const emits = defineEmits<{
  (event: "modal:Close"): void;
}>();

const confirm = () => {
  emits("modal:Close");
};
</script>

<template>
  <transition name="modal-fade">
    <div v-if="confirmModalInfo.visible" class="checkout-modal-overlay">
      <div class="checkout-modal-wrapper">
        <div class="checkout-modal-message">{{ confirmModalInfo.message }}</div>
        <div class="checkout-modal-button" @click="confirm">
          {{ confirmModalInfo.buttonText }}
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.checkout-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.checkout-modal-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 20px;
  width: 80%;
  height: 150px;
  background-color: var(--border-primary);
}

.checkout-modal-message {
  font-family: var(--font-family-bold), sans-serif;
  font-size: var(--font-size-14);
  color: var(--text-fourth);
  white-space: pre-line;
}

.checkout-modal-button {
  border: 2px solid var(--button-primary);
  border-radius: 15px;
  padding: 16px 120px;
  font-family: var(--font-family-bold), sans-serif;
  transition: background-color 0.3s ease;
}

.checkout-modal-button:hover {
  background-color: var(--ivory-400);
}

.checkout-modal-button:active {
  background-color: var(--ivory-200);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
