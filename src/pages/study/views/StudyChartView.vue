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
import { Member, MemberApis } from "@/api/MemberApis";
import { CategoryMap, CategoryType } from "@/types/Category";

const CHART_COLOR_PALETTE = [
  "#b4b4b4", // 예외 색상
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

interface CategoryChartData {
  categoryName: string;
  reviewedCount: number;
  color: string;
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  ChartDataLabels
);

const props = defineProps<{
  memberId: number;
}>();

const categoryChartData = ref<CategoryChartData[]>([]);

const data = ref<ChartData<"doughnut"> | null>(null);

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

const buildChartData = (
  categoryChartData: CategoryChartData[]
): ChartData<"doughnut"> => {
  return {
    labels: categoryChartData.map((categoryData) => categoryData.categoryName),
    datasets: [
      {
        label: "등록서평수",
        data: categoryChartData.map(
          (categoryData) => categoryData.reviewedCount
        ),
        backgroundColor: categoryChartData.map(
          (categoryData) => categoryData.color
        ),
        hoverBackgroundColor: categoryChartData.map(
          (categoryData) => categoryData.color
        ),
      },
    ],
  };
};

const parseReviewCategoryCounts = (reviewCategoryCounts: {
  [key: string]: number;
}): CategoryChartData[] => {
  const reviewCategoryCountsMap = new Map(Object.entries(reviewCategoryCounts));

  const data: CategoryChartData[] = [];
  reviewCategoryCountsMap.forEach((count, category) => {
    const categoryName = CategoryMap.get(category as CategoryType);
    if (category !== "ALL" && categoryName && count > 0) {
      data.push({
        categoryName: categoryName,
        reviewedCount: count,
        color: CHART_COLOR_PALETTE[data.length + 1],
      });
    }
  });

  if (data.length <= 0) {
    data.push({
      categoryName: "서평 없어요",
      reviewedCount: 1,
      color: CHART_COLOR_PALETTE[0],
    });
  }

  return data;
};

const fetchMemberStatics = async (memberId: number): Promise<void> => {
  await MemberApis.getMemberProfile(memberId)
    .then((response) => {
      categoryChartData.value = parseReviewCategoryCounts(
        (response as Member).memberStatics.reviewCategoryCounts
      );

      data.value = buildChartData(categoryChartData.value);
    })
    .catch((error) =>
      console.error("StudyChartView.fetchMemberStatics", error)
    );
};

fetchMemberStatics(props.memberId);
</script>

<template>
  <div class="my-study-chart-container">
    <Doughnut v-if="data" :data="data" :options="options" />
  </div>
</template>

<style scoped>
.my-study-chart-container {
  width: auto;
  background-color: var(--surface-tertiary);
  position: relative;
  box-shadow: inset 0 10px 10px -10px rgba(0, 0, 0, 0.2),
    inset 0 -10px 10px -10px rgba(0, 0, 0, 0.2);
}
</style>
