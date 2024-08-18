<script lang="ts" setup>
import ProfileImageSettingView from "@/pages/my/components/ProfileImageSettingView.vue";
import { ref } from "vue";
import {
  mapMemberResponseToMember,
  Member,
  MemberApis,
  MemberResponse,
} from "@/api/MemberApis";
import ProfileInfoSettingView from "@/pages/my/components/ProfileInfoSettingView.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const memberIdParam = Number(route.params.memberId);

const localMember = ref<Member | null>(null);

const fetchMemberProfile = async () => {
  MemberApis.getMemberProfile(memberIdParam).then(
    (memberResponse: MemberResponse) => {
      localMember.value = mapMemberResponseToMember(memberResponse);
    }
  );
};

const updateMember = (updatedMember: Member) => {
  localMember.value = updatedMember;
};

const submitForm = () => {
  console.log("localMember: ", localMember.value);
};

fetchMemberProfile();
</script>

<template>
  <div v-if="localMember" class="profile-setting-page-wrapper">
    <ProfileImageSettingView :member="localMember" />
    <ProfileInfoSettingView
      :member="localMember"
      @update:Member="updateMember"
    />
    <button @click="submitForm" class="submit-button">가입하기</button>
  </div>
</template>

<style scoped>
.profile-setting-page-wrapper {
  width: 100%;
  display: grid;
  gap: 25px;
}

.submit-button {
  margin: 11px 30px 0 30px;
  padding: 15px;
  color: var(--text-primary);
  border: 2px solid var(--button-secondary);
  border-radius: 10px;
  background-color: transparent;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}
</style>
