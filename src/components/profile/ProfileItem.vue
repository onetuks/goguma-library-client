<script setup lang="ts">
import { ref } from "vue";
import UserEditProfileButton from "@/components/profile/UserEditProfileButton.vue";
import UserMemberGrade from "@/components/profile/UserMemberGrade.vue";
import UserNickname from "@/components/profile/UserNickname.vue";
import UserSelfIntroduction from "@/components/profile/UserSelfIntroduction.vue";
import UserStatCounter from "@/components/profile/UserStatCounter.vue";
import UserInstagramButton from "@/components/profile/UserInstagramButton.vue";
import SubscribeButton from "@/components/button/SubscribeButton.vue";

// Dummy data for testing
// eslint-disable-next-line @typescript-eslint/no-var-requires
const profileImage = ref(require("@/assets/test/forest.png"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const profilePicture = ref(require("@/assets/profile/base_profile.png"));
const points = ref(150);
const username = ref("치킨인더군");
const introduction = ref("식물을 키우며 글을 씁니다.");
const reviewCount = ref(10);
const followerCount = ref(50);
const followingCount = ref(30);
const isSubscribed = ref(false);
</script>

<template>
  <div class="profile-item">
    <!-- 프로필 배경 이미지 -->
    <div class="image-section">
      <img
        :src="profileImage"
        alt="Profile Background"
        class="profile-background"
      />
      <UserEditProfileButton />
    </div>

    <!-- 프로필 이미지와 등급 -->
    <div class="profile-picture-wrapper">
      <img
        :src="profilePicture"
        alt="Profile Picture"
        class="profile-picture"
      />
      <UserMemberGrade :points="points" />
    </div>

    <!-- 프로필 정보 섹션 -->
    <div class="info-section">
      <UserNickname :nickname="username" />
      <UserSelfIntroduction :introduction="introduction" />
      <div class="stats-section">
        <UserStatCounter label="서평" :count="reviewCount" />
        <UserStatCounter label="팔로워" :count="followerCount" />
        <UserStatCounter label="팔로잉" :count="followingCount" />
      </div>
      <div class="action-buttons">
        <UserInstagramButton />
        <SubscribeButton :is-subscribed="isSubscribed" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-item {
  width: 100%;
  max-width: 390px;
  height: 436px;
  background-color: var(--background-primary);
  position: relative;
}

.image-section {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  z-index: 1; /* 배경 이미지 섹션이 제일 밑으로 가도록 설정 */
}

.profile-background {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.profile-picture-wrapper {
  position: absolute;
  top: 153px;
  left: 15px;
  width: 128px;
  height: 128px;
  z-index: 3; /* 프로필 이미지가 글자 위로 올라오지 않도록 설정 */
}

.profile-picture {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid var(--border-secondary);
}

.info-section {
  padding: 20px 15px;
  position: relative;
  z-index: 2; /* 글자가 프로필 이미지에 가려지지 않도록 설정 */
}

.stats-section {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.stats-section div {
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
