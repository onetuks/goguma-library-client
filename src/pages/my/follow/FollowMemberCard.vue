<script lang="ts" setup>
import { Member } from "@/api/MemberApis";
import FollowButton from "@/components/button/FollowButton.vue";

const props = defineProps<{
  member: Member;
}>();
</script>

<template>
  <div class="follow-member-card-container">
    <div class="follow-member-card-wrapper">
      <img
        :src="props.member.profileImageUrl"
        alt="profile image"
        class="follow-member-image"
      />
      <div class="follow-member-info-container">
        <div class="follow-member-nickname">{{ props.member.nickname }}</div>
        <div class="follow-member-introduction">
          {{ props.member.introduction }}
        </div>
      </div>
    </div>
    <FollowButton :member-id="props.member.memberId" />
  </div>
</template>

<style scoped>
.follow-member-card-container {
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.follow-member-card-wrapper {
  display: flex;
  flex-direction: row;
}

.follow-member-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
}

.follow-member-info-container {
  padding: 12px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 7px;
  text-align: left;
}

.follow-member-nickname {
  font-size: 16px;
  font-family: var(--font-family-bold), sans-serif;
}

.follow-member-introduction {
  font-size: 14px;
}
</style>
