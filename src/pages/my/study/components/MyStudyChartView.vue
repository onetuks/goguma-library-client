<script setup lang="ts">
import { ref } from "vue";
import { Doughnut } from "vue-chartjs";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Chart,
  ChartData,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { initReviewCategoryCounts, Member, MemberApis } from "@/api/MemberApis";
import { CategoryMap, CategoryType } from "@/types/Category";

const CHART_COLOR_PALETTE = [
  "#FF9696",
  "#FFF8B5",
  "#C6CCFF",
  "#B2FFCD",
  "#FFC8B2",
  "#FFD6FF",
  "#C2FFC2",
  "#FFE5C2",
  "#C2E0FF",
  "#EFC2FF",
  "#FFF5C2",
];

const props = defineProps<{
  memberId: number;
}>();

const reviewCategoryCounts = ref<Map<CategoryType, number>>(
  initReviewCategoryCounts()
);

const fetchMemberStatics = async (memberId: number): Promise<void> => {
  await MemberApis.getMemberProfile(memberId)
    .then(
      (response) =>
        (reviewCategoryCounts.value = (
          response as Member
        ).memberStatics.reviewCategoryCounts)
    )
    .catch((error) =>
      console.error("MyStudyChartView.fetchMemberStatics", error)
    );
};

fetchMemberStatics(props.memberId);

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartDataLabels
);

const parseData = (
  reviewCategoryCounts: Map<CategoryType, number>
): [string, number][] => {
  const data: [string, number][] = [];
  Array.from(reviewCategoryCounts).forEach(([category, count]) => {
    const categoryName = CategoryMap.get(category);
    if (category !== "ALL" && categoryName && count > 0) {
      data.push([categoryName, count]);
    }
  });

  if (data.length <= 0) {
    data.push(["서평 없어요", 1]);
  }
  return data;
};

const data = ref<ChartData<"doughnut">>({
  labels: parseData(reviewCategoryCounts.value).map(([label]) => label),
  datasets: [
    {
      label: "등록서평수",
      data: parseData(reviewCategoryCounts.value).map(([, count]) => count),
      backgroundColor: CHART_COLOR_PALETTE,
      hoverBackgroundColor: CHART_COLOR_PALETTE,
    },
  ],
});

const options = ref<ChartOptions<"doughnut">>({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.75,
  cutout: "40%",
  layout: {
    autoPadding: true,
    padding: 45,
  },
  plugins: {
    datalabels: {
      align: "end",
      color: "#756357",
      font: {
        size: 16,
        family: "NanumSquareBold",
      },
      formatter: function (value, context) {
        const chart = context.chart as Chart<"doughnut">;
        const label = chart.data.labels?.[context.dataIndex];
        return label as string;
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#e1ddcb",
      titleColor: "#756357",
      bodyColor: "#756357",
      usePointStyle: true,
    },
    legend: {
      position: "right",
      labels: {
        usePointStyle: true,
        font: {
          size: 8,
          family: "NanumSquareBold",
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: "#f4f3ec",
      borderJoinStyle: "round",
      borderRadius: 10,
    },
  },
});
</script>

<template>
  <div class="my-study-chart-container">
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<style scoped>
.my-study-chart-container {
  width: auto;
  background-color: var(--surface-tertiary);
  position: relative;
  box-shadow: inset 0 10px 10px -10px rgba(0, 0, 0, 0.3),
    inset 0 -10px 10px -10px rgba(0, 0, 0, 0.3);
}
</style>
