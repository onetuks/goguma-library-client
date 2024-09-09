<script setup lang="ts">
import FollowButton from "@/components/button/FollowButton.vue";
import { Member, MemberApis } from "@/api/MemberApis";
import { ref } from "vue";
import router from "@/router";

const props = defineProps<{
  memberId: number;
}>();

const member = ref<Member>();

const moveToOtherMemberStudy = (): void => {
  router.push(`/study?member-id=${props.memberId}`);
};

const handleProfileImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = require("@/assets/icon/profile/default-profile.png");
};

const fetchMember = async (): Promise<void> => {
  await MemberApis.getMemberProfile(props.memberId).then((response) => {
    member.value = { ...response } as Member;
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
    <div class="review-detail-member-nickname" @click="moveToOtherMemberStudy">
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
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 10px;
  padding: 0 3px;
  height: 30px;
  display: flex;
  align-items: center;
}

.review-detail-member-nickname:hover {
  background-color: var(--surface-fourth);
  color: var(--text-fourth);
}

.review-detail-member-nickname:active {
  background-color: var(--surface-sixth);
  color: var(--text-tertiary);
}
</style>
