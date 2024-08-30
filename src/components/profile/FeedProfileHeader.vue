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
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin: 0 auto;
}

.profile-picture {
  width: 12%;
  height: 12%;
  border-radius: 50%;
}

.profile-info {
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-left: 10px;
}

.username {
  font-size: 14px;
  color: var(--text-secondary);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-right: 5%;
}
</style>
