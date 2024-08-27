<script setup lang="ts">
import SubscribeButton from "@/components/button/FollowButton.vue";
import PickButton from "@/components/button/ReviewPickButton.vue";

// 예제 데이터
const props = {
  profilePicture: require("@/assets/test/profile_picture.png"), // 프로필 이미지 경로
  username: "김서재", // 임의의 닉네임
  isSubscribed: false,
  pickCount: 5,
  isPicked: false,
};
</script>

<template>
  <div class="profile-header">
    <img
      :src="props.profilePicture"
      alt="Profile Picture"
      class="profile-picture"
    />
    <div class="profile-info">
      <span class="username">{{ props.username }}</span>
      <SubscribeButton :isFollowed="props.isSubscribed" />
    </div>
    <PickButton
      :pickCount="props.pickCount"
      :isPicked="props.isPicked"
      class="pick-button"
    />
  </div>
</template>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensures the space between items */
  width: 360px;
  height: 40px;
  margin: 0 auto; /* Center the component */
}

.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.profile-info {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 10px; /* Adjust this margin as needed */
}

.username {
  font-size: 14px; /* 제목 중 크기 */
  color: var(--text-secondary);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Drop shadow */
  margin-right: 10px;
}

.subscribe-button {
  margin-right: 10px;
}

.pick-button {
  margin-right: 25px; /* Ensure 10px margin from the right */
}
</style>
