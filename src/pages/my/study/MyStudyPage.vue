<script setup lang="ts">
import MyStudyChartView from "@/pages/my/study/components/MyStudyChartView.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const memberId = Number(route.params.memberId);
</script>

<template>
  <div class="my-study-page-container">
    <MyStudyChartView :member-id="memberId" />
  </div>
</template>

<style scoped>
.my-study-page-container {
  width: 100%;
}
</style>
