<script setup lang="ts">
import ProfileView from "@/pages/my/mypage/components/ProfileView.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member, MemberApis } from "@/api/MemberApis";
import MyStudyChartView from "@/pages/study/components/StudyChartView.vue";
import StudyReviewListView from "@/pages/study/components/StudyReviewListView.vue";
import ProfileBadgeView from "@/pages/my/mypage/components/ProfileBadgeView.vue";
import { eventBus } from "@/util/EventBus";

const route = useRoute();

const member = ref<Member>();

const fetchMember = async (): Promise<void> => {
  const memberId = Number(route.query["member-id"]);
  await MemberApis.getMemberProfile(memberId)
    .then((response) => {
      member.value = response as Member;

      if (member.value.nickname) {
        eventBus.emit("update:Nickname", member.value.nickname);
      }
    })
    .catch((error) => console.error("OthersStudyPage.fetchMember", error));
};

fetchMember();
</script>

<template>
  <div class="others-study-page-container" v-if="member">
    <ProfileView :member="member" />
    <MyStudyChartView :member-id="member.memberId" />
    <StudyReviewListView :member-id="member.memberId" />
    <ProfileBadgeView :member-id="member.memberId" />
  </div>
</template>

<style scoped>
.others-study-page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  background-color: var(--border-secondary);
}
</style>
