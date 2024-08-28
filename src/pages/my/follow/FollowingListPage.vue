<script setup lang="ts">
import { emptyPage, Page } from "@/types/Page";
import { FollowApis } from "@/api/FollowApis";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member } from "@/api/MemberApis";
import FollowMemberCard from "@/pages/my/follow/FollowMemberCard.vue";
import PaginationView from "@/components/bar/PaginationView.vue";

const route = useRoute();

const followings = ref<Page<Member>>(emptyPage());

const fetchFollowings = async (): Promise<void> => {
  const memberId = Number(route.params.memberId);
  await FollowApis.getFollowings(memberId, followings.value.number)
    .then((response) => {
      followings.value = response as Page<Member>;
    })
    .catch((error) => console.error("FollowListPage.fetchFollowings", error));
};

fetchFollowings();
</script>

<template>
  <div class="follow-list-page-container">
    <FollowMemberCard
      :member="member"
      v-for="(member, index) in followings.content"
      :key="index"
    />
    <PaginationView :page-info="followings" />
  </div>
</template>

<style scoped>
.follow-list-page-container {
  width: 100%;
  padding: 3px 15px;
  box-sizing: border-box;
}
</style>
