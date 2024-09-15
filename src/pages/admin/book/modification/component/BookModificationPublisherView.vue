<script lang="ts" setup>
import { ref, watch } from "vue";
import { BookPatchRequest } from "@/api/AdminBookApis";

const props = defineProps<{
  bookPatchRequest: BookPatchRequest;
}>();

const emits = defineEmits<{
  (event: "update:BookPatchRequest", bookPatchRequest: BookPatchRequest): void;
}>();

const localBookPatchRequest = ref<BookPatchRequest>({
  ...props.bookPatchRequest,
});

watch(
  () => props.bookPatchRequest,
  (newBookPatchRequest) => {
    localBookPatchRequest.value = { ...newBookPatchRequest };
  }
);

watch(
  () => localBookPatchRequest.value.publisher,
  (newPublisher) => {
    if (newPublisher && newPublisher.length > 0) {
      emits("update:BookPatchRequest", {
        ...localBookPatchRequest.value,
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
      v-model="localBookPatchRequest.publisher"
      class="form-input"
      placeholder="출판사를 입력해주세요"
      type="text"
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
