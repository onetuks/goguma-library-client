<script lang="ts" setup>
import ProfileView from "@/components/view/ProfileView.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member, MemberApis } from "@/api/MemberApis";
import StudyChartView from "@/pages/study/views/StudyChartView.vue";
import StudyReviewListView from "@/pages/study/views/StudyReviewListView.vue";
import BadgeView from "@/components/view/BadgeView.vue";
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
  <div v-if="member" class="others-study-page-container">
    <ProfileView :member="member" />
    <StudyChartView :member-id="member.memberId" />
    <StudyReviewListView :member-id="member.memberId" />
    <BadgeView :member="member" />
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
