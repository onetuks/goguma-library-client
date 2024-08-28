<script setup lang="ts">
import { ref } from "vue";
import { Follow, FollowApis } from "@/api/FollowApis";
import { ConfirmModalInfo, initModalInfo } from "@/types/Modal";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

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
      .then(() => {
        follow.value = null;
      })
      .catch((error) => {
        console.error("FollowButton toggleFollowStatus - delete", error);
      });
    return;
  }

  await FollowApis.postNewFollow(props.memberId)
    .then((response) => {
      follow.value = { ...response } as Follow;
    })
    .catch((error) => {
      console.error("FollowButton toggleFollowStatus - post", error);
      confirmModalInfo.value = {
        message: "자기자신은 팔로우 할 수 없습니다",
        buttonText: "확인",
        visible: true,
      };
    });
};

const fetchFollow = async (): Promise<void> => {
  await FollowApis.getMyFollow(props.memberId)
    .then((response) => {
      follow.value = response as Follow;
    })
    .catch(() => {
      follow.value = null;
    });
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
