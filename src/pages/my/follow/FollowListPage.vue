<script setup lang="ts">
import { emptyPage, Page } from "@/types/Page";
import { FollowApis } from "@/api/FollowApis";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member } from "@/api/MemberApis";
import FollowMemberCard from "@/pages/my/follow/FollowMemberCard.vue";
import PaginationView from "@/components/bar/PaginationView.vue";

const route = useRoute();

const followers = ref<Page<Member>>(emptyPage());

const fetchFollowers = async (): Promise<void> => {
  const memberId = Number(route.params.memberId);
  await FollowApis.getFollowers(memberId, followers.value.number)
    .then((response) => {
      followers.value = response as Page<Member>;
    })
    .catch((error) => console.error("FollowListPage.fetchFollowers", error));

  followers.value.content.push({
    memberId: 101,
    nickname: "닉네임이여",
    introduction: "안녕학세요",
    instagramUrl: "www.instagram.com/no1",
    interestedCategories: ["CARTOON", "NOVEL"],
    isAlarmAccepted: true,
    points: 12,
    profileImageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    profileBackgroundImageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    memberStatics: {
      memberStaticsId: 101,
      reviewCounts: 12,
      followerCounts: 100,
      followingCounts: 100,
      reviewCategoryCounts: [],
    },
  });

  followers.value.content.push({
    memberId: 1,
    nickname: "별명이여",
    introduction: "하이헬로",
    instagramUrl: "www.instagram.com/no1",
    interestedCategories: ["CARTOON", "NOVEL"],
    isAlarmAccepted: true,
    points: 12,
    profileImageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    profileBackgroundImageUrl:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    memberStatics: {
      memberStaticsId: 101,
      reviewCounts: 12,
      followerCounts: 100,
      followingCounts: 100,
      reviewCategoryCounts: [],
    },
  });
};

fetchFollowers();
</script>

<template>
  <div class="follow-list-page-container">
    <FollowMemberCard
      :member="member"
      v-for="(member, index) in followers.content"
      :key="index"
    />
    <PaginationView :page-info="followers" />
  </div>
</template>

<style scoped>
.follow-list-page-container {
  width: 100%;
  padding: 3px 15px;
  box-sizing: border-box;
}
</style>
