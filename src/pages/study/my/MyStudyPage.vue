<script lang="ts" setup>
import StudyChartView from "@/pages/study/views/StudyChartView.vue";
import StudyReviewListView from "@/pages/study/views/StudyReviewListView.vue";
import MyStudyBookPickListView from "@/pages/study/my/views/MyStudyBookPickListView.vue";
import MyStudyReviewPickListView from "@/pages/study/my/views/MyStudyReviewPickListView.vue";
import { LOGIN_ID } from "@/types/AuthWords";

const memberId = Number(localStorage.getItem(LOGIN_ID));
</script>

<template>
  <div class="my-study-page-container">
    <StudyChartView :member-id="memberId" />
    <StudyReviewListView :member-id="memberId" />
    <MyStudyBookPickListView />
    <MyStudyReviewPickListView />
  </div>
</template>

<style scoped>
.my-study-page-container {
  width: 100%;
  background-color: var(--surface-tertiary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}
</style>
