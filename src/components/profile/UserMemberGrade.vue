<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  points: {
    type: Number,
    required: true,
  },
});

const gradeImage = computed(() => {
  if (props.points < 100) return require("@/assets/profile/member_grade1.png");
  else if (props.points < 200)
    return require("@/assets/profile/member_grade2.png");
  else if (props.points < 300)
    return require("@/assets/profile/member_grade3.png");
  else return require("@/assets/profile/member_grade4.png");
});

const gradeName = computed(() => {
  if (props.points < 100) return "고구마새싹";
  else if (props.points < 200) return "고구마줄기";
  else if (props.points < 300) return "고구마꽃";
  else return "고구마";
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const infoIcon = require("@/assets/profile/point_information.png");

const navigateToPointInfo = () => {
  // TODO: Navigate to point information page
};
</script>

<template>
  <!-- 루트 요소 추가 -->
  <div class="member-grade">
    <img :src="gradeImage" alt="Member Grade" class="grade-image" />
    <div class="grade-info">
      <span class="grade-name">{{ gradeName }}</span>
      <span class="points">포인트: {{ props.points }}</span>
    </div>
    <img
      :src="infoIcon"
      class="info-icon"
      alt="Info Icon"
      @click="navigateToPointInfo"
    />
  </div>
</template>

<style scoped>
.member-grade {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
  left: 143px;
}

.grade-image {
  width: 40px;
  height: 40px;
}

.grade-info {
  margin-left: 10px;
}

.grade-name,
.points {
  display: block;
  color: #000;
  font-size: 12px; /* 본문 소 */
}

.info-icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
