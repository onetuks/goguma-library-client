<script setup lang="ts">
import { ref } from "vue";
import { BadgeApis, BadgeRequest, BadgeResponse } from "@/api/BadgeApis";
import { ApiError } from "@/api/ServerRequest";
import { ConfirmModalInfo, initConfirmModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import AdminBadgeRegistrationNameView from "@/pages/admin/registration/components/AdminBadgeRegistrationNameView.vue";
import AdminBadgeRegistrationDescriptionView from "@/pages/admin/registration/components/AdminBadgeRegistrationDescriptionView.vue";
import AdminBadgeRegistrationCoverUploadCard from "@/pages/admin/registration/components/AdminBadgeRegistrationCoverUploadCard.vue";
import router from "@/router";

const BADGE_REGISTRATION_SUCCESS_MESSAGE = "뱃지가 등록되었습니다";

const registeredBadgeId = ref<number | null>(null);

const badgeRequest = ref<BadgeRequest>({
  badgeName: "",
  badgeImageFilename: "",
});

const badgeImageData = ref<{ file: File | null; filename: string | null }>({
  file: null,
  filename: null,
});

const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

const updateBadgeRequest = (newRequest: BadgeRequest): void => {
  badgeRequest.value = { ...newRequest };
};

const updateBadgeImageData = (newData: {
  file: File | null;
  filename: string | null;
}): void => {
  badgeImageData.value = { ...newData };
};

const validateBadgeRequest = (): void => {
  if (badgeRequest.value.badgeName.trim().length === 0) {
    throw new Error("뱃지 이름을 입력해주세요");
  }
  if (!badgeImageData.value.file) {
    throw new Error("뱃지 이미지를 등록해주세요");
  }
};

const registerBadge = async () => {
  try {
    validateBadgeRequest();

    await BadgeApis.postNewBadge(
      {
        ...badgeRequest.value,
        badgeImageFilename: badgeImageData.value.filename || "",
      },
      badgeImageData.value.file
    )
      .then((response: BadgeResponse) => {
        registeredBadgeId.value = response.badgeId;
        confirmModalInfo.value = {
          message: BADGE_REGISTRATION_SUCCESS_MESSAGE,
          buttonText: "확인",
          visible: true,
        };
      })
      .catch((error: ApiError) => {
        console.error("AdminBadgeRegistrationPage.registerBadge", error);
        handleBadgeRegistrationError(error);
      });
  } catch (error) {
    if (error instanceof Error) {
      confirmModalInfo.value = {
        visible: true,
        message: error.message,
        buttonText: "확인",
      };
    }
  }
};

const handleBadgeRegistrationError = (error: ApiError): void => {
  const message =
    error.code === "G010"
      ? "이미 등록된 뱃지입니다"
      : "뱃지 등록 중 오류가 발생했습니다";
  confirmModalInfo.value = {
    visible: true,
    message,
    buttonText: "확인",
  };
};

const closeModal = () => {
  if (confirmModalInfo.value.message === BADGE_REGISTRATION_SUCCESS_MESSAGE) {
    router.push(`/badges/${registeredBadgeId.value}/info`);
  }

  confirmModalInfo.value = initConfirmModalInfo();
};
</script>

<template>
  <div class="badge-registration-container">
    <AdminBadgeRegistrationNameView
      :badge-request="badgeRequest"
      @update:BadgeRequest="updateBadgeRequest"
    />
    <AdminBadgeRegistrationDescriptionView
      :badge-request="badgeRequest"
      @update:BadgeRequest="updateBadgeRequest"
    />
    <AdminBadgeRegistrationCoverUploadCard
      :badge-request="badgeRequest"
      :cover-image-data="badgeImageData"
      @update:CoverImageData="updateBadgeImageData"
    />
    <button class="badge-registration-button" @click="registerBadge">
      뱃지 등록하기
    </button>
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
  </div>
</template>

<style scoped>
.badge-registration-container {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  font-family: var(--font-family-regular), sans-serif;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.badge-registration-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px 0 30px;
  width: auto;
  height: 50px;
  border: 2px solid var(--button-secondary);
  border-radius: 15px;
  font-family: var(--font-family-bold), sans-serif;
  font-size: 14px;
  background-color: transparent;
}

.badge-registration-button:active {
  background-color: var(--surface-sixth);
}
</style>
