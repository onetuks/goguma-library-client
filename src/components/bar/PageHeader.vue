<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    headerTitle: string;
  }>(),
  {
    headerTitle: "고구마 서재",
  }
);

const goBack = () => window.history.back();
</script>

<template>
  <header>
    <div class="header-container">
      <img
        src="@/assets/icon/direction/left_icon.png"
        alt="뒤로가기"
        @click="goBack"
        class="back-button"
      />
      <p class="header-title">{{ props.headerTitle }}</p>
    </div>
    <div class="header-division"></div>
  </header>
</template>

<style scoped>
header {
  height: 50px;
  width: 100%;
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
}

.back-button:hover {
  background-color: var(--surface-fourth);
}

.back-button:active {
  background-color: var(--surface-sixth);
}
</style>
