<script lang="ts" setup>
import { ref } from "vue";
import { PointApis, PointHistory } from "@/api/PointApis";
import PointInfoView from "@/pages/my/point/components/PointInfoView.vue";
import PointHistoryView from "@/pages/my/point/components/PointHistoryView.vue";
import PaginationView from "@/components/bar/PaginationView.vue";
import { emptyPage, Page } from "@/types/Page";

const pointHistories = ref<Page<PointHistory>>(emptyPage());

const fetchPointHistories = async () => {
  await PointApis.getPointHistories(pointHistories.value.number).then(
    (response) => {
      pointHistories.value = response as Page<PointHistory>;
    }
  );
};

fetchPointHistories();
</script>

<template>
  <div class="point-history-container">
    <PointInfoView />
    <PointHistoryView :point-history="pointHistories.content" />
    <PaginationView :page-info="pointHistories" />
  </div>
</template>

<style scoped>
.point-history-container {
  width: 100%;
  height: auto;
  padding: 15px;
  box-sizing: border-box;
  font-family: var(--font-family-regular), sans-serif;
}
</style>
