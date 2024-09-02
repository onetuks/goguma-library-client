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
  () => localBookPostRequest.value.introduction,
  (newIntroduction) => {
    if (newIntroduction.length > 0) {
      emits("update:BookPostRequest", {
        ...localBookPostRequest.value,
        introduction: newIntroduction,
      });
    }
  }
);

const autoResize = (event: Event) => {
  const textArea = event.target as HTMLTextAreaElement;
  textArea.style.height = "auto";
  textArea.style.height = `${textArea.scrollHeight}px`;
};
</script>

<template>
  <div class="form-container">
    <label class="form-label">소개글</label>
    <textarea
      ref="textArea"
      class="form-input"
      v-model="localBookPostRequest.introduction"
      placeholder="도서 소개글을 입력해주세요"
      @input="autoResize"
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
  resize: none;
  overflow: hidden;
  line-height: 1.5;
  font-family: sans-serif;
}
</style>
