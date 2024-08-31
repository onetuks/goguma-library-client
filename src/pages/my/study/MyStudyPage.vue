<script setup lang="ts">
import MyStudyChartView from "@/pages/my/study/components/MyStudyChartView.vue";
import { useRoute } from "vue-router";
import MyStudyReviewListView from "@/pages/my/study/components/MyStudyReviewListView.vue";
import MyStudyBookPickListView from "@/pages/my/study/components/MyStudyBookPickListView.vue";
import MyStudyReviewPickListView from "@/pages/my/study/components/MyStudyReviewPickListView.vue";

const route = useRoute();

const memberId = Number(route.params.memberId);
</script>

<template>
  <div class="my-study-page-container">
    <MyStudyChartView :member-id="memberId" />
    <MyStudyReviewListView :member-id="memberId" />
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
