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
  () => props.book.publisher,
  (newPublisher) => {
    localBook.value.publisher = newPublisher;
  }
);

watch(localBook, (newBook) => {
  if (newBook.publisher && newBook.publisher.length > 0) {
    emits("update:Book", { ...newBook });
  }
});
</script>

<template>
  <div class="form-container">
    <label class="form-label">출판사</label>
    <input
      type="text"
      v-model="localBook.publisher"
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
