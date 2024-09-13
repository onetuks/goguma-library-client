<script lang="ts" setup></script>

<template>
  <div class="notice-container">
    <div class="notice-title">유의사항</div>
    <div class="notice-content-container">
      <div class="notice-content-item">
        * 도서 등록 후 누락된 정보나 오기입된 정보, 잘못된 정보는
      </div>
      <div class="notice-content-item">
        &nbsp;&nbsp;고구마서재 측에서 수정할 수 있습니다
      </div>
      <div class="notice-content-item">
        * 허위로 등록된 도서는 통지없이 삭제될 수 있습니다
      </div>
    </div>
  </div>
</template>

<style scoped>
.notice-container {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
}

.notice-title {
  font-size: 14px;
  color: var(--text-fifth);
  text-align: left;
  margin-bottom: 10px;
}

.notice-content-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-align: left;
}

.notice-content-item {
  width: auto;
  font-size: 12px;
  color: var(--text-fifth);
}
</style>
