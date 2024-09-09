<script setup lang="ts">
import { BookPostRequest } from "@/api/BookApis";
import { ref, watch } from "vue";

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
  () => localBookPostRequest.value.isIndie,
  (newIsIndie) => {
    emits("update:BookPostRequest", {
      ...localBookPostRequest.value,
      isIndie: newIsIndie,
    });
  }
);

const setIsIndie = (): void => {
  localBookPostRequest.value.isIndie = true;
};

const setIsNotIndie = (): void => {
  localBookPostRequest.value.isIndie = false;
};
</script>

<template>
  <div class="form-container">
    <div class="form-label">독립출판물 체크<span class="required">*</span></div>
    <div class="form-check">
      <label class="checkbox-label">
        <input
          type="radio"
          :checked="localBookPostRequest.isIndie"
          @click="setIsIndie"
        />
        <span class="custom-checkbox"></span>
        <span class="custom-checkbox-label">독립출판물이 맞아요</span>
      </label>
    </div>
    <div class="form-check">
      <label class="checkbox-label">
        <input
          type="radio"
          :checked="!localBookPostRequest.isIndie"
          @click="setIsNotIndie"
        />
        <span class="custom-checkbox"></span>
        <span class="custom-checkbox-label">독립출판물이 아니에요</span>
      </label>
    </div>
    <div class="form-info-container">
      <div class="form-info-title">*독립출판이란?</div>
      <div class="form-info-content">
        <div class="form-info-content-item">
          독립출판은 대형 출판사를 거치지 않고 작가가 직접
        </div>
        <div class="form-info-content-item">
          출판 과정을 관리하여 책을 출간하는 방식입니다.
        </div>
      </div>
    </div>
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

.required {
  color: #ff0000;
  margin-left: 2px;
}

.form-check {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
}

.form-info-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: auto;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 5px;
}

.form-info-title {
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-fourth);
  font-size: 16px;
  text-align: left;
  margin-bottom: 7px;
}

.form-info-content {
  text-align: center;
}

.form-info-content-item {
  font-size: 14px;
}

.checkbox-label {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-primary);
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
}

.custom-checkbox-label {
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
  font-weight: normal;
}

.checkbox-label input:checked + .custom-checkbox::after {
  background-color: var(--gray-300);
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
</style>
