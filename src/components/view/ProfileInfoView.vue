<script setup lang="ts">
import router from "@/router";
import { Member } from "@/api/MemberApis";
import ProfileStaticsView from "@/components/view/ProfileStaticsView.vue";
import FollowButton from "@/components/button/FollowButton.vue";

const props = defineProps<{
  member: Member;
}>();

const moveToMyReviewPage = () => {
  router.push("/reviews/my");
};

const moveToFollowerPage = () => {
  router.push(`/members/${props.member.memberId}/follows`);
};

const moveToFollowingPage = () => {
  router.push(`/members/${props.member.memberId}/followings`);
};

const moveToInstagram = () => {
  window.open(
    `https://www.instagram.com/${props.member.instagramUrl.replace(
      "www.instagram.com/",
      ""
    )}`
  );
};
</script>

<template>
  <div class="info-section">
    <div class="nickname">{{ member.nickname }}</div>
    <div class="introduction">
      {{ member.introduction || "만나서 반가운 뉴비 고구마" }}
    </div>
    <div class="bottom-section">
      <div class="stats-section">
        <ProfileStaticsView
          label="서평"
          :count="member.memberStatics.reviewCounts"
          @click="moveToMyReviewPage"
        />
        <ProfileStaticsView
          label="팔로워"
          :count="member.memberStatics.followerCounts"
          @click="moveToFollowerPage"
        />
        <ProfileStaticsView
          label="팔로잉"
          :count="member.memberStatics.followingCounts"
          @click="moveToFollowingPage"
        />
      </div>
      <div class="button-container">
        <img
          src="../../assets/icon/profile/instagram-icon.png"
          alt="Instagram"
          @click="moveToInstagram"
          class="instagram"
        />
        <FollowButton :member-id="member.memberId" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-section {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
}

.nickname {
  font-family: var(--font-family-extra-bold), sans-serif;
  font-size: var(--font-size-16);
  color: var(--text-fourth);
  text-align: left;
}

.introduction {
  display: inline-block;
  padding: 10px;
  background-color: var(--surface-tertiary);
  color: var(--text-fourth);
  font-size: 12px;
  border-radius: 10px;
  text-align: left;
  width: fit-content;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-break: break-word;
}

.bottom-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-section {
  display: flex;
  gap: 15px;
}

.stats-section div {
  text-align: center;
}

.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.instagram {
  width: 34px;
  height: 34px;
  border-radius: 40%;
  transition: background-color 0.3s ease;
}

.instagram:hover {
  background-color: var(--surface-fourth);
}

.instagram:active {
  background-color: var(--surface-sixth);
}
</style>
