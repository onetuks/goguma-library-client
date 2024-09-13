<script lang="ts" setup>
import { Member, MemberApis } from "@/api/MemberApis";
import { ref } from "vue";
import router from "@/router";

const recommendedMembers = ref<Member[]>();

const moveToOtherStudyPage = (member: Member): void => {
  router.push(`/study?member-id=${member.memberId}`);
};

const fetchRecommendedMembers = async (): Promise<void> => {
  await MemberApis.getRecommendedMemberProfiles()
    .then((responses) => {
      recommendedMembers.value = responses as Member[];
    })
    .catch((error) => {
      console.error("HomeMemberRecommendView.fetchRecommendedMembers", error);
    });
};

fetchRecommendedMembers();
</script>

<template>
  <div class="home-member-recommend-container">
    <div
      v-for="member in recommendedMembers"
      :key="member.memberId"
      class="home-member-recommend-item"
      @click="moveToOtherStudyPage(member)"
    >
      <img
        :alt="member.nickname"
        :src="member.profileImageUrl"
        class="home-member-recommend-image"
      />
    </div>
  </div>
</template>

<style scoped>
.home-member-recommend-container {
  margin-top: 10px;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 0 15px;
  box-sizing: border-box;
}

.home-member-recommend-item {
  width: 50px;
  min-width: 50px;
  height: 50px;
  border: 2px solid var(--border-primary);
  transition: border 0.6s ease;
  border-radius: 50%;
}

.home-member-recommend-item:hover {
  border: 2px solid var(--button-fourth);
}

.home-member-recommend-item:active {
  border: 2px solid var(--button-secondary);
}

.home-member-recommend-image {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
