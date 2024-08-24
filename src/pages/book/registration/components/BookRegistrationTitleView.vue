<script setup lang="ts">
import { ref, watch } from "vue";
import { Book } from "@/api/BookApis";

const props = defineProps<{
  book: Book;
}>();

const emits = defineEmits<{
  (event: "update:Book", book: Book): void;
}>();

const localBook = ref<Book>({ ...props.book });

watch(
  () => props.book.title,
  (newTitle) => {
    localBook.value.title = newTitle;
  }
);

watch(localBook, (newBook) => {
  if (newBook.title && newBook.title.length > 0) {
    emits("update:Book", { ...newBook });
  }
});
</script>

<template>
  <div class="form-container">
    <label class="form-label">제목<span class="required">*</span> </label>
    <input
      type="text"
      v-model="localBook.title"
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
