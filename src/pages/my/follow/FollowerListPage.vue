<script lang="ts" setup>
import { emptyPage, Page } from "@/types/Page";
import { FollowApis } from "@/api/FollowApis";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member } from "@/api/MemberApis";
import FollowMemberCard from "@/pages/my/follow/FollowMemberCard.vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";
import WarningPage from "@/pages/error/WarningPage.vue";

const route = useRoute();

const followers = ref<Page<Member>>(emptyPage());

const fetchFollowers = async (): Promise<void> => {
  const memberId = Number(route.params.memberId);
  await FollowApis.getFollowers(memberId, followers.value.number)
    .then((response) => {
      followers.value = response as Page<Member>;
    })
    .catch((error) => console.error("FollowListPage.fetchFollowers", error));
};

fetchFollowers();
</script>

<template>
  <div class="follow-list-page-container">
    <WarningPage
      v-if="followers.totalElements === 0"
      :is-visible-button="true"
    />
    <FollowMemberCard
      v-for="(member, index) in followers.content"
      v-else
      :key="index"
      :member="member"
    />
    <PaginationBar :page-info="followers" />
  </div>
</template>

<style scoped>
.follow-list-page-container {
  width: 100%;
  padding: 3px 15px;
  box-sizing: border-box;
}
</style>
