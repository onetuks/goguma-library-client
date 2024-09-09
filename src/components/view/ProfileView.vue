<script setup lang="ts">
import { Member } from "@/api/MemberApis";
import ProfileImageView from "@/components/view/ProfileImageView.vue";
import ProfileInfoView from "@/components/view/ProfileInfoView.vue";

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
