<script setup lang="ts">
import { ref } from "vue";
import { Follow, FollowApis } from "@/api/FollowApis";
import { ConfirmModalInfo, initModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";
import { ApiError } from "@/api/ServerRequest";

const props = defineProps<{
  memberId: number;
}>();

const follow = ref<Follow | null>();
const confirmModalInfo = ref<ConfirmModalInfo>(initModalInfo());

const closeModal = (): void => {
  confirmModalInfo.value = initModalInfo();
};

const isFollowed = (): boolean => {
  return follow.value !== null;
};

const toggleFollowStatus = async (): Promise<void> => {
  if (follow.value) {
    await FollowApis.deleteFollow(follow.value.followId)
      .then(() => (follow.value = null))
      .catch((error) => handleError(error));
    return;
  }

  await FollowApis.postNewFollow(props.memberId)
    .then((response) => (follow.value = { ...response } as Follow))
    .catch((error) => handleError(error));
};

const fetchFollow = async (): Promise<void> => {
  await FollowApis.getMyFollow(props.memberId).then(
    (response) => (follow.value = response as Follow)
  );
};

const handleError = (error: ApiError): void => {
  console.error("FollowButton toggleFollowStatus", error);

  let message: string;
  switch (error.code) {
    case "G007":
      message = "팔로우 할 수 없는 멤버입니다";
      break;
    case "E001":
      message = "자기자신은 팔로우 할 수 없습니다";
      break;
    default:
      message = "팔로우 할 수 없습니다";
      break;
  }

  confirmModalInfo.value = {
    message: message,
    buttonText: "확인",
    visible: true,
  };
};

fetchFollow();
</script>

<template>
  <div class="follow-button-container">
    <button
      :class="['subscription-button', `{ subscribed: ${isFollowed} }`]"
      @click="toggleFollowStatus"
    >
      {{ isFollowed() ? "팔로잉" : "팔로우" }}
    </button>
    <ConfirmModal
      :confirm-modal-info="confirmModalInfo"
      @modal:Close="closeModal"
    />
  </div>
</template>

<style scoped>
.follow-button-container {
  width: auto;
  text-align: center;
}

.subscription-button {
  padding: 7px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid var(--border-primary);
  color: var(--text-fourth);
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.subscription-button.subscribed {
  border-color: var(--border-tertiary);
  color: var(--text-fourth);
  background-color: transparent;
}

.subscription-button:not(.subscribed):hover {
  background-color: var(--border-primary);
  color: var(--text-fourth);
}

.subscription-button.subscribed:hover {
  background-color: transparent;
  color: var(--text-fourth);
  border-color: var(--border-tertiary);
}
</style>
