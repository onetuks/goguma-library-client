<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { Member, MemberApis, MemberResponse } from "@/api/MemberApis";
import ProfileView from "@/components/view/ProfileView.vue";
import ProfileAttendanceView from "@/pages/my/mypage/views/MyProfileAttendanceView.vue";
import BadgeView from "@/components/view/BadgeView.vue";
import {
  ConfirmCancelModalInfo,
  initConfirmCancelModalInfo,
} from "@/types/Modal";
import router from "@/router";
import { AuthApis } from "@/api/AuthApis";
import ConfirmCancelModal from "@/components/modal/ConfirmCancelModal.vue";

const route = useRoute();

const memberIdParam = Number(route.params.memberId);
const member = ref<Member | null>(null);

const confirmCancelModalInfo = ref<ConfirmCancelModalInfo>(
  initConfirmCancelModalInfo()
);

const fetchMemberProfile = async (): Promise<void> => {
  MemberApis.getMemberProfile(memberIdParam).then(
    (response: MemberResponse) => {
      member.value = { ...response } as Member;
    }
  );
};

const showLogoutModal = (): void => {
  confirmCancelModalInfo.value = {
    message: "로그아웃 하시겠습니까?",
    confirmButtonText: "네",
    cancelButtonText: "아니오",
    visible: true,
  };
};

const confirmModal = async (): Promise<void> => {
  await AuthApis.logout().then((response) => {
    console.log(response);
    confirmCancelModalInfo.value = initConfirmCancelModalInfo();
    router.push("/");
  });
};

const closeModal = (): void => {
  confirmCancelModalInfo.value = initConfirmCancelModalInfo();
};

const moveToWithdrawPage = (): void => {
  router.push("/withdraw");
};

fetchMemberProfile();
</script>

<template>
  <div v-if="member" class="my-profile-page-wrapper">
    <ProfileView :member="member" />
    <div class="divider" />
    <ProfileAttendanceView :member-id="memberIdParam" />
    <BadgeView :member="member" />

    <div class="logout-container">
      <div class="logout-button" @click="showLogoutModal">로그아웃</div>
      <div class="logout-button" @click="moveToWithdrawPage">회원탈퇴</div>
    </div>

    <ConfirmCancelModal
      :confirm-cancel-modal-info="confirmCancelModalInfo"
      @modal:Confirm="confirmModal"
      @modal:Close="closeModal"
    />
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

.logout-container {
  display: flex;
  flex-direction: row;
  text-align: right;
  color: var(--text-primary);
  justify-content: right;
  border-top: 10px solid var(--border-secondary);
  padding-top: 25px;
  padding-right: 15px;
  padding-bottom: 33px;
}

.logout-button {
  font-size: 11px;
  border: none;
  padding: 3px 5px;
  color: var(--text-fifth);
  border-bottom: 1px solid var(--text-fifth);
  margin-left: 4px;
  transition: font-size 0.5s ease, color 0.5s ease, border-bottom 0.5s ease;
  background-color: transparent;
}

.logout-button:hover {
  font-size: 12px;
  color: var(--text-fourth);
  border-bottom: 1px solid var(--text-fourth);
}

.logout-button:active {
  font-size: 12px;
  color: var(--text-tertiary);
  border-bottom: 1px solid var(--text-tertiary);
}
</style>
