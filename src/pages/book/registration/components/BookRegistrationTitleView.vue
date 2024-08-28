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
  () => localBookPostRequest.value.title,
  (newTitle) => {
    if (newTitle.length > 0) {
      emits("update:BookPostRequest", {
        ...localBookPostRequest.value,
        title: newTitle,
      });
    }
  }
);
</script>

<template>
  <div class="form-container">
    <label class="form-label">제목<span class="required">*</span> </label>
    <input
      type="text"
      v-model="localBookPostRequest.title"
      placeholder="도서 제목을 입력해주세요"
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

.required {
  color: #ff0000;
  margin-left: 2px;
}
</style>
