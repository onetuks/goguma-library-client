<script setup lang="ts">
import FollowButton from "@/components/button/FollowButton.vue";
import {
  mapMemberResponseToMember,
  Member,
  MemberApis,
} from "@/api/MemberApis";
import { ref } from "vue";

const props = defineProps<{
  memberId: number;
}>();

const member = ref<Member>();

const handleProfileImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/profile/default-profile.png");
};

const fetchMember = async (): Promise<void> => {
  await MemberApis.getMemberProfile(props.memberId).then((response) => {
    member.value = mapMemberResponseToMember(response);
  });
};

fetchMember();
</script>

<template>
  <div class="review-detail-member-info" v-if="member">
    <img
      :src="member.profileImageUrl"
      :alt="member.nickname"
      class="review-detail-member-profile-image"
      @error="handleProfileImageError"
    />
    <div class="review-detail-member-nickname">
      {{ member.nickname }}
    </div>
    <FollowButton :member-id="member.memberId" />
  </div>
</template>

<style scoped>
.review-detail-member-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 10px;
}

.review-detail-member-profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.review-detail-member-nickname {
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-family-bold), sans-serif;
}
</style>
