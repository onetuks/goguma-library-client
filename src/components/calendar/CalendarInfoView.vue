<script lang="ts" setup></script>

<template>
  <div class="calendar-info-container">
    <div class="calendar-info-title">출석 이벤트 참여 방법</div>
    <div class="calendar-info-content-container">
      <p>•&nbsp;&nbsp;&nbsp;출석체크 기간 동안 매일 1회 참여할 수 있어요</p>
      <p>•&nbsp;&nbsp;&nbsp;출석체크시 +1 포인트가 적립됩니다.</p>
      <p>•&nbsp;&nbsp;&nbsp;누적 출석 횟수 달성시 추가 포인트가 적립됩니다</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;3회 누적: 3P</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;5회 누적: 5P</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;10회 누적: 15P</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;30회 누적: 30P</p>
    </div>
  </div>
</template>

<style scoped>
.calendar-info-container {
  width: 100%;
  background-color: var(--surface-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 10px;
  text-align: left;
}

.calendar-info-title {
  font-family: var(--font-family-bold), sans-serif;
  font-size: 16px;
  color: var(--text-fourth);
  padding: 10px;
}

.calendar-info-content-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

p {
  font-size: 14px;
  margin: 2px 0;
}
</style>
