<script setup lang="ts">
import { eventBus } from "@/util/EventBus";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    headerTitle: string;
  }>(),
  {
    headerTitle: "고구마 서재",
  }
);

const nickname = ref<string>();

const goBack = () => window.history.back();

eventBus.on("update:Nickname", (newNickname) => {
  if (newNickname) {
    nickname.value = newNickname as string;
  }
});
</script>

<template>
  <header class="header-view-container">
    <div class="header-container">
      <img
        src="@/assets/icon/direction/left_icon.png"
        alt="뒤로가기"
        @click="goBack"
        class="back-button"
      />
      <p class="header-title">
        {{ nickname ? nickname : "" }}{{ props.headerTitle }}
      </p>
    </div>
    <div class="header-division"></div>
  </header>
</template>

<style scoped>
.header-view-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  z-index: 10;
}

.header-container {
  display: flex;
  align-items: center;
  height: 50px;
}

.header-division {
  background-color: var(--border-primary);
  width: 100%;
  height: 1px;
}

.header-title {
  flex-grow: 1;
  font-size: 20px;
}

.back-button {
  background-color: var(--background-primary);
  position: absolute;
  transition: background-color 0.3s ease;
  border-radius: 0 50% 50% 0;
}

.back-button:hover {
  background-color: var(--surface-fourth);
}

.back-button:active {
  background-color: var(--surface-sixth);
}
</style>
