<script lang="ts" setup>
import ProfileImageSettingView from "@/pages/my/setting/components/ProfileImageSettingView.vue";
import { ref } from "vue";
import {
  mapMemberResponseToMember,
  Member,
  MemberApis,
  MemberPatchRequest,
  MemberResponse,
} from "@/api/MemberApis";
import { useRoute } from "vue-router";
import router from "@/router";
import ProfileInfoSettingView from "@/pages/my/setting/components/ProfileInfoSettingView.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ConfirmModalInfo, initModalInfo } from "@/types/Modal";
import { IS_NEW_MEMBER } from "@/types/AuthWords";

const route = useRoute();

const memberIdParam = Number(route.params.memberId);

const localMember = ref<Member | null>(null);
const profileImageFilename = ref<string | null>(null);
const profileImageFile = ref<File | null>(null);
const profileBackgroundImageFilename = ref<string | null>(null);
const profileBackgroundImageFile = ref<File | null>(null);

const confirmModalInfo = ref<ConfirmModalInfo>(initModalInfo());

const closeModal = () => {
  confirmModalInfo.value = {
    visible: false,
    message: "",
    buttonText: "",
  };
};

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
    <button @click="submitForm" class="submit-button">가입하기</button>
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
