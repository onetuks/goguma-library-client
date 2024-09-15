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
  () => localBookPatchRequest.value.introduction,
  (newIntroduction) => {
    if (newIntroduction && newIntroduction.length > 0) {
      emits("update:BookPatchRequest", {
        ...localBookPatchRequest.value,
        introduction: newIntroduction,
      });
    }
  }
);
</script>

<template>
  <div class="form-container">
    <label class="form-label">소개글</label>
    <textarea
      v-model="localBookPatchRequest.introduction"
      class="form-input"
      placeholder="소개글을 입력해주세요"
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
  width: 100%;
  padding: 8px 10px;
  box-sizing: border-box;
  border: none;
  font-size: 14px;
}
</style>
