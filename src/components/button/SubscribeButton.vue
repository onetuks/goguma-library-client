<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    isSubscribed: boolean;
  }>(),
  {
    isSubscribed: false,
  }
);

const localIsSubscribed = ref(props.isSubscribed);

const toggleSubscription = () => {
  localIsSubscribed.value = !localIsSubscribed.value;
};
</script>

<template>
  <button
    :class="['subscription-button', { subscribed: localIsSubscribed }]"
    @click="toggleSubscription"
  >
    {{ localIsSubscribed ? "팔로잉" : "팔로우" }}
  </button>
</template>

<style scoped>
.subscription-button {
  width: 70px;
  height: 30px;
  padding: 5px 0;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid var(--border-primary); /* border/primary */
  color: var(--text-fourth); /* text/fourth */
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* drop shadow 추가 */
}

.subscription-button.subscribed {
  border-color: var(--border-tertiary); /* border/tertiary */
  color: var(--text-fourth); /* text/fourth */
  background-color: transparent; /* 배경색 없음 */
}

.subscription-button:not(.subscribed):hover {
  background-color: var(--border-primary); /* 팔로우 버튼 hover 색상 */
  color: var(--text-fourth); /* text/fourth */
}

.subscription-button.subscribed:hover {
  background-color: transparent; /* 배경색 없음 */
  color: var(--text-fourth); /* text/fourth */
  border-color: var(--border-tertiary); /* 테두리 색상만 변경 */
}
</style>
