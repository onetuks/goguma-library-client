<script setup lang="ts">
import { ref, watch } from "vue";
import { BookPostRequest } from "@/api/BookApis";

const props = defineProps<{
  bookPostRequest: BookPostRequest;
}>();

const emits = defineEmits<{
  (event: "update:BookPostRequest", bookPostRequest: BookPostRequest): void;
}>();

const localBookPostRequest = ref<BookPostRequest>({ ...props.bookPostRequest });

watch(
  () => props.bookPostRequest,
  (newBookPostRequest) => {
    localBookPostRequest.value = { ...newBookPostRequest };
  }
);

watch(
  () => localBookPostRequest.value.publisher,
  (newPublisher) => {
    if (newPublisher && newPublisher.length > 0) {
      emits("update:BookPostRequest", {
        ...localBookPostRequest.value,
        publisher: newPublisher,
      });
    }
  }
);
</script>

<template>
  <div class="form-container">
    <label class="form-label">출판사</label>
    <input
      type="text"
      v-model="localBookPostRequest.publisher"
      placeholder="출판사를 입력해주세요"
      class="form-input"
    />
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  gap: 10px;
}

.form-label {
  font-family: var(--font-family-bold), sans-serif;
  font-size: 16px;
}

.form-input {
  background-color: var(--surface-tertiary);
  height: 36px;
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  border: none;
  font-size: 14px;
}
</style>
