<script lang="ts" setup>
import ProfileImageSettingView from "@/pages/my/setting/views/ProfileImageSettingView.vue";
import { ref } from "vue";
import {
  Member,
  MemberApis,
  MemberPatchRequest,
  MemberResponse,
} from "@/api/MemberApis";
import router from "@/router";
import ProfileInfoSettingView from "@/pages/my/setting/views/ProfileInfoSettingView.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import { IS_NEW_MEMBER, LOGIN_ID } from "@/types/AuthWords";
import MainPageHeader from "@/components/bar/MainPageHeader.vue";

const memberIdParam = Number(localStorage.getItem(LOGIN_ID));

const localMember = ref<Member | null>(null);
const profileImageFilename = ref<string | null>(null);
const profileImageFile = ref<File | null>(null);
const profileBackgroundImageFilename = ref<string | null>(null);
const profileBackgroundImageFile = ref<File | null>(null);

const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

const isNewMember = localStorage.getItem(IS_NEW_MEMBER) === "true";

const closeModal = () => {
  confirmModalInfo.value = {
    visible: false,
    message: "",
    buttonText: "",
  };
};

const fetchMemberProfile = async (): Promise<void> => {
  MemberApis.getMemberProfile(memberIdParam).then(
    (response: MemberResponse) => {
      const fetchedMember = { ...response } as Member;
      localMember.value = fetchedMember;
      profileImageFilename.value = fetchedMember.profileImageUrl;
      profileBackgroundImageFilename.value =
        fetchedMember.profileBackgroundImageUrl;
    }
  );
};

const updateMember = (updatedMember: Member) => {
  localMember.value = updatedMember;
};

const updateProfileImage = (newProfileImageFile: File | null) => {
  profileImageFile.value = newProfileImageFile;
};

const updateProfileBackgroundImage = (
  newProfileBackgroundImageFile: File | null
) => {
  profileBackgroundImageFile.value = newProfileBackgroundImageFile;
};

const updateProfileImageFilename = (newProfileImageFilename: string | null) => {
  profileImageFilename.value = newProfileImageFilename;
};

const updateProfileBackgroundImageFilename = (
  newProfileBackgroundImageFilename: string | null
) => {
  profileBackgroundImageFilename.value = newProfileBackgroundImageFilename;
};

const notEnoughInfo = () => {
  return (
    !localMember.value ||
    !localMember.value?.nickname ||
    localMember.value?.nickname.length > 10 ||
    localMember.value?.nickname.length < 2 ||
    !localMember.value?.interestedCategories ||
    localMember.value?.interestedCategories.length < 1 ||
    localMember.value?.interestedCategories.length > 3
  );
};

const submitForm = async () => {
  if (notEnoughInfo()) {
    confirmModalInfo.value = {
      visible: true,
      message: "정보를 모두 입력해주세요",
      buttonText: "확인",
    };
    return;
  }

  const memberPatchRequest: MemberPatchRequest = {
    nickname: localMember.value?.nickname || "고구마 침팬치",
    introduction: localMember.value?.introduction,
    instagramUrl: localMember.value?.instagramUrl,
    interestedCategories: localMember.value?.interestedCategories || ["ALL"],
    isAlarmAccepted: localMember.value?.isAlarmAccepted || true,
    profileImageFilename: profileImageFilename.value,
    profileBackgroundImageFilename: profileBackgroundImageFilename.value,
  };

  await MemberApis.patchMemberProfile(
    memberIdParam,
    memberPatchRequest,
    profileImageFile.value,
    profileBackgroundImageFile.value
  ).then(() => {
    localStorage.setItem(IS_NEW_MEMBER, "false");
    router.push("/");
  });
};

fetchMemberProfile();
</script>

<template>
  <div v-if="localMember" class="profile-setting-page-wrapper">
    <MainPageHeader :page-title="isNewMember ? '회원가입' : '프로필 수정'" />
    <ProfileImageSettingView
      :member="localMember"
      @update:ProfileImageFile="updateProfileImage"
      @update:ProfileBackgroundImageFile="updateProfileBackgroundImage"
      @update:ProfileImageFilename="updateProfileImageFilename"
      @update:ProfileBackgroundImageFilename="
        updateProfileBackgroundImageFilename
      "
    />
    <ProfileInfoSettingView
      :member="localMember"
      @update:Member="updateMember"
    />
    <button @click="submitForm" class="submit-button">
      {{ isNewMember ? "가입하기" : "수정하기" }}
    </button>
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
  </div>
</template>

<style scoped>
.profile-setting-page-wrapper {
  width: 100%;
  display: grid;
  gap: 25px;
}

.submit-button {
  margin: 11px 30px 11px 30px;
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
