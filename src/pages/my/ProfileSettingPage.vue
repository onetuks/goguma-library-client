<script lang="ts" setup>
import ProfileImageSettingView from "@/pages/my/components/ProfileImageSettingView.vue";
import { ref } from "vue";
import {
  mapMemberResponseToMember,
  Member,
  MemberApis,
  MemberPatchRequest,
  MemberResponse,
} from "@/api/MemberApis";
import ProfileInfoSettingView from "@/pages/my/components/ProfileInfoSettingView.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const memberIdParam = Number(route.params.memberId);

const localMember = ref<Member | null>(null);
const profileImageFile = ref<File | null>(null);
const profileBackgroundImageFile = ref<File | null>(null);

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

const updateProfileImage = (newProfileImageFile: File | null) =>
  (profileImageFile.value = newProfileImageFile);

const updateProfileBackgroundImage = (
  newProfileBackgroundImageFile: File | null
) => (profileBackgroundImageFile.value = newProfileBackgroundImageFile);

const notEnoughInfo = () => {
  return (
    !localMember.value ||
    !localMember.value?.nickname ||
    !localMember.value?.interestedCategories ||
    localMember.value?.interestedCategories.length < 1 ||
    localMember.value?.interestedCategories.length > 3
  );
};

const submitForm = async () => {
  if (notEnoughInfo()) {
    alert("필수 정보를 입력해주세요.");
    return;
  }

  const memberPatchRequest: MemberPatchRequest = {
    nickname: localMember.value?.nickname || "고구마 침팬치",
    introduction: localMember.value?.nickname,
    instagramUrl: localMember.value?.instagramUrl,
    interestedCategories: localMember.value?.interestedCategories || ["ALL"],
    isAlarmAccepted: localMember.value?.isAlarmAccepted || true,
  };

  await MemberApis.patchMemberProfile(
    memberIdParam,
    memberPatchRequest,
    profileImageFile.value,
    profileBackgroundImageFile.value
  ).then((memberResponse: MemberResponse) => {
    console.log("멤버 프로필 수정 결과 : ", memberResponse);
  });
};

fetchMemberProfile();
</script>

<template>
  <div v-if="localMember" class="profile-setting-page-wrapper">
    <ProfileImageSettingView
      :member="localMember"
      @update:ProfileImageFile="updateProfileImage"
      @update:ProfileBackgroundImageFile="updateProfileBackgroundImage"
    />
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
