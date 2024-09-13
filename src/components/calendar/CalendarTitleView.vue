<script lang="ts" setup></script>

<template>
  <div class="calendar-container-title-container">
    <img
      alt="clover-icon"
      class="calendar-container-title-image"
      src="@/assets/icon/clover/clover-icon.png"
    />
    <div class="calendar-container-title">출석체크</div>
    <img
      alt="clover-icon"
      class="calendar-container-title-image"
      src="@/assets/icon/clover/clover-icon.png"
    />
  </div>
</template>

<style scoped>
.calendar-container-title-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 15px;
}

.calendar-container-title-image {
  margin-top: 1px;
  width: 21px;
  height: 21px;
}

.calendar-container-title {
  padding: 0 8px;
  color: var(--text-tertiary);
  font-family: var(--font-family-extra-bold), sans-serif;
  font-size: 24px;
}
</style>
