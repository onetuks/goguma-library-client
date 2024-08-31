<script lang="ts" setup>
import { Member } from "@/api/MemberApis";
import router from "@/router";
import { ref } from "vue";
import { GradeType } from "@/types/GradeType";
import { LOGIN_ID } from "@/types/AuthWords";

const props = defineProps<{
  member: Member;
}>();

const grade = ref<GradeType>("고구마씨앗");

const goToSettingPage = () => {
  router.push(`/members/${props.member.memberId}/settings`);
};

const goToPointReceiptsPage = () => {
  router.push(`/members/${props.member.memberId}/points`);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/profile/default-profile.png");
};

const isEditable = (): boolean => {
  return Number(localStorage.getItem(LOGIN_ID)) === props.member.memberId;
};

const getGradeType = (points: number): GradeType => {
  if (points < 1000) {
    return "고구마씨앗";
  } else if (points < 2000) {
    return "고구마새싹";
  } else if (points < 3000) {
    return "고구마알갱이";
  }
  return "군고구마";
};

const getGradeImage = (grade: GradeType): string => {
  switch (grade) {
    case "고구마씨앗":
      return require("@/assets/icon/grade/member_grade1.png");
    case "고구마새싹":
      return require("@/assets/icon/grade/member_grade2.png");
    case "고구마알갱이":
      return require("@/assets/icon/grade/member_grade3.png");
    case "군고구마":
      return require("@/assets/icon/grade/member_grade4.png");
  }
};

getGradeType(props.member.points);
</script>

<template>
  <div class="profile-image-card-wrapper">
    <div
      class="profile-background-image-wrapper"
      :style="{
        backgroundImage: `url(${props.member.profileBackgroundImageUrl})`,
      }"
    >
      <div class="setting-button-wrapper" v-if="isEditable()">
        <div class="setting-button" @click="goToSettingPage">프로필 수정</div>
      </div>
    </div>
    <img
      :src="props.member.profileImageUrl"
      alt="profile image"
      class="profile-image-wrapper"
      @error="handleImageError"
    />
    <img
      :src="getGradeImage(grade)"
      alt="grade image"
      class="profile-grade-image-wrapper"
    />
    <div class="profile-image-rest-wrapper">
      <div class="profile-point-info-wrapper">
        <div class="profile-point-info">
          <p class="profile-point-info-item">{{ grade }}</p>
          <p class="profile-point-info-item">
            포인트: {{ props.member.points }}P
          </p>
        </div>
        <img
          src="@/assets/icon/point/query-icon.png"
          alt="query icon"
          class="profile-point-query"
          @click="goToPointReceiptsPage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-image-card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 280px;
  position: relative;
}

.profile-background-image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: var(--gray-800);
  position: relative;
}

.setting-button-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: auto;
}

.setting-button {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0 10px;
  height: 30px;
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  background-color: var(--ivory-800);
  opacity: 90%;
  color: var(--text-fourth);
  font-size: 15px;
}

.profile-image-wrapper {
  position: absolute;
  left: 10px;
  bottom: 0;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  z-index: 2;
}

.profile-grade-image-wrapper {
  position: absolute;
  left: 95px;
  bottom: 5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 3;
}

.profile-image-rest-wrapper {
  display: flex;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 3px;
  position: relative;
  justify-content: flex-end;
  z-index: 1;
}

.profile-image-rest-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: linear-gradient(to bottom, var(--gray-800), transparent);
  pointer-events: none;
}

.profile-point-info-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.profile-point-info {
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-14);
}

.profile-point-query {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  border-radius: 40%;
  transition: background-color 0.3s ease;
}

.profile-point-query:hover {
  background-color: var(--surface-fourth);
}

.profile-point-info-item {
  font-family: var(--font-family-regular), sans-serif;
  margin: 0;
  font-size: 12px;
}
</style>
