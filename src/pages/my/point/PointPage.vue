<script lang="ts" setup>
import { ref } from "vue";
import { PointApis, PointHistory } from "@/api/PointApis";
import PointInfoView from "@/pages/my/point/views/PointInfoView.vue";
import PointHistoryView from "@/pages/my/point/views/PointHistoryView.vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";
import { emptyPage, Page } from "@/types/Page";

const pointHistories = ref<Page<PointHistory>>(emptyPage());

const fetchPointHistories = async (page: number) => {
  await PointApis.getPointHistories(page).then((response) => {
    pointHistories.value = response as Page<PointHistory>;
  });
};

fetchPointHistories(pointHistories.value.number);
</script>

<template>
  <div class="point-history-container">
    <PointInfoView />
    <PointHistoryView :point-history="pointHistories.content" />
    <PaginationBar
      :page-info="pointHistories"
      @request:Page="fetchPointHistories"
    />
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
