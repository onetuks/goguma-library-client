<script setup lang="ts">
import { ref, watch } from "vue";
import { BadgeRequest } from "@/api/BadgeApis";

const props = defineProps<{
  badgeRequest: BadgeRequest;
}>();

const emits = defineEmits<{
  (event: "update:BadgeRequest", badgeRequest: BadgeRequest): void;
}>();

const localBadgeRequest = ref<BadgeRequest>({ ...props.badgeRequest });

watch(
  () => props.badgeRequest,
  (newBadgeRequest) => {
    localBadgeRequest.value = { ...newBadgeRequest };
  }
);

watch(
  () => localBadgeRequest.value.badgeName,
  (newBadgeName) => {
    if (newBadgeName.length > 0) {
      emits("update:BadgeRequest", {
        ...localBadgeRequest.value,
        badgeName: newBadgeName,
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
    <label class="form-label">뱃지 설명</label>
    <textarea
      ref="textArea"
      class="form-input"
      v-model="localBadgeRequest.badgeName"
      placeholder="뱃지 설명을 입력해주세요"
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
