<script setup lang="ts">
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
      for (let i = 0; i < 10; i++)
        recommendedMembers.value.push(recommendedMembers.value[0]);
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
      class="home-member-recommend-item"
      v-for="member in recommendedMembers"
      :key="member.memberId"
      @click="moveToOtherStudyPage(member)"
    >
      <img
        :src="member.profileImageUrl"
        :alt="member.nickname"
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
  justify-content: space-between;
  gap: 10px;
  padding: 0 15px;
  box-sizing: border-box;
}

.home-member-recommend-item {
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--border-primary);
  transition: border 0.3s ease;
}

.home-member-recommend-item:hover {
  border: 2px solid var(--button-fourth);
}

.home-member-recommend-item:active {
  border: 2px solid var(--button-secondary);
}

.home-member-recommend-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
