<script setup lang="ts">
import ProfileImageView from "@/pages/my/mypage/components/ProfileImageView.vue";
import ProfileInfoView from "@/pages/my/mypage/components/ProfileInfoView.vue";
import { Member } from "@/api/MemberApis";

defineProps<{
  member: Member;
}>();
</script>

<template>
  <div class="profile-view-wrapper">
    <ProfileImageView :member="member" />
    <ProfileInfoView :member="member" />
  </div>
</template>

<style scoped>
.profile-view-wrapper {
  width: 100%;
  height: auto;
  background-color: var(--background-primary);
  position: relative;
}
</style>
