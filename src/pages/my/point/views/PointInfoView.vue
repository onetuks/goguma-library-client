<script lang="ts" setup></script>

<template>
  <div class="point-info">
    <div class="point-info-title">*포인트 적립 안내</div>
    <div class="point-info-message">포인트에 대한 소개글이 들어갑니다</div>
    <div class="point-info-table">
      <div>
        <div class="point-info-table-item-title-container">
          <div class="point-info-message">출석 보상:</div>
          <div class="point-info-message">1P ~ 30P</div>
        </div>
        <div class="point-info-table-item-stroke"></div>
      </div>
      <div>
        <div class="point-info-table-item-title-container">
          <div class="point-info-message">신규 도서 등록:</div>
          <div class="point-info-message">20P</div>
        </div>
        <div class="point-info-table-item-stroke"></div>
      </div>
      <div>
        <div class="point-info-table-item-title-container">
          <div class="point-info-message">서평 작성:</div>
          <div class="point-info-message">10P</div>
        </div>
        <div class="point-info-table-item-stroke"></div>
      </div>
      <div>
        <div class="point-info-table-item-title-container">
          <div class="point-info-message">추천 도서로 서평 작성:</div>
          <div class="point-info-message">30P</div>
        </div>
        <div class="point-info-table-item-stroke"></div>
      </div>
      <div>
        <div class="point-info-table-item-title-container">
          <div class="point-info-message">추천 서평 선정:</div>
          <div class="point-info-message">50P</div>
        </div>
        <div class="point-info-table-item-stroke"></div>
      </div>
      <div>
        <div class="point-info-table-item-title-container">
          <div class="point-info-message">자신의 서평에 좋아요 1회 추가시:</div>
          <div class="point-info-message">5P</div>
        </div>
        <div class="point-info-table-item-stroke"></div>
      </div>
      <div>
        <div class="point-info-table-item-title-container">
          <div class="point-info-message">타인의 서평에 좋아요 클릭시:</div>
          <div class="point-info-message">1P</div>
        </div>
        <div class="point-info-table-item-stroke"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.point-info {
  margin-top: 15px;
  padding: 10px;
  background-color: var(--surface-tertiary);
  border-radius: 5px;
  border: 1px solid var(--border-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  gap: 21px;
}

.point-info-title {
  color: var(--text-fourth);
  font-size: 16px;
  font-family: var(--font-family-bold), sans-serif;
}

.point-info-message {
  font-size: 14px;
}

.point-info-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.point-info-table-item-title-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.point-info-table-item-stroke {
  background-color: var(--border-primary);
  width: 100%;
  height: 1px;
}
</style>
