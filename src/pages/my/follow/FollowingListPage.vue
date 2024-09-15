<script lang="ts" setup>
import { emptyPage, Page } from "@/types/Page";
import { FollowApis } from "@/api/FollowApis";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member } from "@/api/MemberApis";
import FollowMemberCard from "@/pages/my/follow/FollowMemberCard.vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";

const route = useRoute();

const followings = ref<Page<Member>>(emptyPage());

const fetchFollowings = async (page: number): Promise<void> => {
  const memberId = Number(route.params.memberId);
  await FollowApis.getFollowings(memberId, page)
    .then((response) => {
      followings.value = response as Page<Member>;
    })
    .catch((error) => console.error("FollowListPage.fetchFollowings", error));
};

fetchFollowings(followings.value.number);
</script>

<template>
  <div class="follow-list-page-container">
    <FollowMemberCard
      v-for="(member, index) in followings.content"
      :key="index"
      :member="member"
    />
    <PaginationBar :page-info="followings" @request:Page="fetchFollowings" />
  </div>
</template>

<style scoped>
.follow-list-page-container {
  width: 100%;
  padding: 3px 15px;
  box-sizing: border-box;
}
</style>
