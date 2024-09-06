<template>
  <PageHeader v-if="!isBasicPages()" :header-title="getPageTitle()" />
  <nav>
    <router-link to="/" />
  </nav>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
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
  transition: opacity 0.3s ease;
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

<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ConfirmModalInfo, initConfirmModalInfo } from "./types/Modal";
import { ACCESS_TOKEN } from "@/types/AuthWords";
import NavigationBar from "@/components/bar/NavigationBar.vue";
import PageHeader from "@/components/bar/PageHeader.vue";
import ConfirmModal from "@/components/modal/ConfirmModal.vue";

onMounted(() => {
  const isNotLoggedIn: boolean = localStorage.getItem(ACCESS_TOKEN) == null;
  const isNotLoginPage: boolean = router.currentRoute.value.path !== "/login";
  if (isNotLoggedIn && isNotLoginPage) {
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
  router.push("/login");
  confirmModalInfo.value = initConfirmModalInfo();
};

const getPageTitle = (): string => {
  return route.name as string;
};

const isBasicPages = (): boolean => {
  const pageName = String(route.name);
  if (pageName) {
    return (
      pageName.includes("피드") ||
      pageName.includes("고구마서재") ||
      pageName.includes("나의 서재") ||
      pageName.includes("도서 검색") ||
      pageName.includes("마이페이지")
    );
  }
  return false;
};
</script>
