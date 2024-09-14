<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";
import {
  Member,
  MemberApis,
  MemberPatchRequest,
  MemberResponse,
} from "@/api/MemberApis";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import { IS_NEW_MEMBER, LOGIN_ID } from "@/types/AuthWords";
import ProfileImageSettingView from "@/pages/my/setting/views/ProfileImageSettingView.vue";
import ProfileInfoSettingView from "@/pages/my/setting/views/ProfileInfoSettingView.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

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
    !localMember.value?.interestedCategories
  );
};

const outOfLengthNickname = (): boolean => {
  return (
    !localMember.value?.nickname ||
    localMember.value?.nickname.length > 10 ||
    localMember.value?.nickname.length < 2
  );
};

const outOfLengthInterestedCategories = (): boolean => {
  return (
    !localMember.value?.interestedCategories ||
    localMember.value?.interestedCategories.length < 1 ||
    localMember.value?.interestedCategories.length > 3
  );
};

const validateSubmitForm = (): boolean => {
  if (notEnoughInfo()) {
    confirmModalInfo.value = {
      visible: true,
      message: "정보를 모두 입력해주세요",
      buttonText: "확인",
    };
    return true;
  } else if (outOfLengthNickname()) {
    confirmModalInfo.value = {
      visible: true,
      message: "닉네임은 2자 이상 10자 이하로 입력해주세요",
      buttonText: "확인",
    };
    return true;
  } else if (outOfLengthInterestedCategories()) {
    confirmModalInfo.value = {
      visible: true,
      message: "관심 카테고리는 1개 이상 3개 이하로 선택해주세요",
      buttonText: "확인",
    };
    return true;
  }
  return false;
};

const submitForm = async () => {
  if (validateSubmitForm()) {
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
  )
    .then(() => {
      localStorage.setItem(IS_NEW_MEMBER, "false");
      router.push("/");
    })
    .catch((error) => {
      if (
        error.code === "G010" &&
        error.message.includes("이미 존재하는 값으로 설정할 수 없습니다")
      ) {
        confirmModalInfo.value = {
          visible: true,
          message: "이미 존재하는 닉네임입니다",
          buttonText: "확인",
        };
      }
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
    <button class="submit-button" @click="submitForm">
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
