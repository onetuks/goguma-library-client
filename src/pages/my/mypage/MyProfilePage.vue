<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member, MemberApis, MemberResponse } from "@/api/MemberApis";
import ProfileView from "@/pages/my/mypage/components/ProfileView.vue";
import ProfileAttendanceView from "@/pages/my/mypage/components/ProfileAttendanceView.vue";
import ProfileBadgeView from "@/pages/my/mypage/components/ProfileBadgeView.vue";

const route = useRoute();

const memberIdParam = Number(route.params.memberId);
const member = ref<Member | null>(null);

const fetchMemberProfile = async (): Promise<void> => {
  MemberApis.getMemberProfile(memberIdParam).then(
    (response: MemberResponse) => {
      member.value = { ...response } as Member;
    }
  );
};

fetchMemberProfile();
</script>

<template>
  <div v-if="member" class="my-profile-page-wrapper">
    <ProfileView :member="member" />
    <div class="divider" />
    <ProfileAttendanceView :member-id="memberIdParam" />
    <ProfileBadgeView :member-id="memberIdParam" />
  </div>
</template>

<style scoped>
.my-profile-page-wrapper {
  width: 100%;
  height: auto;
}

.divider {
  width: 100%;
  height: 10px;
  background-color: var(--surface-fourth);
  margin-top: 5px;
}
</style>
