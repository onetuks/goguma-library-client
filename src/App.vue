<template>
  <PageHeader />
  <nav>
    <router-link to="/" />
  </nav>

  <router-view v-slot="{ Component }" style="margin-top: 50px">
    <transition mode="out-in" name="fade">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>

  <ConfirmModal
    :confirm-modal-info="confirmModalInfo"
    @modal:Close="moveToLoginPage"
  />

  <NavigationBar class="nav-bar" />
</template>

<style>
@import "@/styles/colors.css";
@import "@/styles/font.css";
@import "https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter {
  opacity: 0.6;
}

.fade-leave-to {
  opacity: 0;
}

body,
html,
#app {
  margin: 0 0 40px 0;
  padding: 0;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--background-primary);
  color: var(--text-primary);
  font-family: var(--font-family-regular), sans-serif;
}
</style>

<script lang="ts" setup>
import router from "@/router";
import { onBeforeUpdate, ref } from "vue";
import { useRoute } from "vue-router";
import { ConfirmModalInfo, initConfirmModalInfo } from "./types/Modal";
import { ACCESS_TOKEN } from "@/types/AuthWords";
import NavigationBar from "@/components/bar/NavigationBar.vue";
import PageHeader from "@/components/bar/PageHeader.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

onBeforeUpdate(() => {
  const isLoggedIn: boolean = localStorage.getItem(ACCESS_TOKEN) != null;
  const isLoginPage: boolean =
    router.currentRoute.value.path.includes("/login") ||
    router.currentRoute.value.path.includes("/login/oauth2/callback");

  if (isLoginPage) {
    confirmModalInfo.value = initConfirmModalInfo();
    return;
  }

  if (!isLoggedIn && !confirmModalInfo.value.visible) {
    confirmModalInfo.value = {
      message: "로그인이 필요해요",
      buttonText: "확인",
      visible: true,
    };
  }
});

const route = useRoute();
const confirmModalInfo = ref<ConfirmModalInfo>(initConfirmModalInfo());

const moveToLoginPage = (): void => {
  confirmModalInfo.value = initConfirmModalInfo();
  router.push("/login");
};
</script>
