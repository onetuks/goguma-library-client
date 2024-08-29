<script lang="ts" setup>
import { ref } from "vue";
import { ReviewPick, ReviewPickApis } from "@/api/ReviewPickApis";

const props = defineProps<{
  reviewId: number;
}>();

const reviewPick = ref<ReviewPick | null>(null);
const pickCount = ref<number>(0);

const toggleReviewPickStatus = async (): Promise<void> => {
  if (reviewPick.value) {
    pickCount.value -= 1;
    await ReviewPickApis.deleteReviewPick(reviewPick.value?.reviewPickId).then(
      () => (reviewPick.value = null)
    );
  } else {
    pickCount.value += 1;
    await ReviewPickApis.postNewReviewPick(props.reviewId)
      .then((response) => (reviewPick.value = { ...response } as ReviewPick))
      .catch((error) => console.error("toggleReviewPickStatus error", error));
  }
};

const getHeartIcon = () => {
  return reviewPick.value
    ? require("@/assets/icon/heart/heart_icon_active.png")
    : require("@/assets/icon/heart/heart_icon_inactive.png");
};

const fetchReviewPick = async (): Promise<ReviewPick> => {
  return await ReviewPickApis.getMyReviewPick(props.reviewId).then(
    (response) => response as ReviewPick
  );
};

const fetchReviewPickCount = async (): Promise<number> => {
  return await ReviewPickApis.getMyReviewPickCount(props.reviewId)
    .then((response) => response as number)
    .catch(() => 0);
};

const fetchData = async (): Promise<void> => {
  reviewPick.value = await fetchReviewPick();
  pickCount.value = await fetchReviewPickCount();
};

fetchData();
</script>

<template>
  <div class="heart-container">
    <button class="heart-button" @click="toggleReviewPickStatus">
      <img :src="getHeartIcon()" alt="Heart Icon" class="heart-icon" />
    </button>
    <span>{{ pickCount }}</span>
  </div>
</template>

<style scoped>
.heart-container {
  display: flex;
  align-items: center;
}

.heart-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.heart-icon {
  width: 24px;
  height: 22px;
}
</style>
