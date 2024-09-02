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
</script>

<template>
  <div class="form-container">
    <label class="form-label">뱃지 이름 </label>
    <input
      type="text"
      v-model="localBadgeRequest.badgeName"
      placeholder="뱃지 이름을 입력해주세요"
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
