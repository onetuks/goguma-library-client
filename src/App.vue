<template>
  <PageHeader v-if="!isBasicPages()" :header-title="getPageTitle()" />
  <nav>
    <router-link to="/" />
  </nav>

  <transition name="fade" mode="out-in">
    <router-view :key="route.fullPath" />
  </transition>

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
import NavigationBar from "@/components/bar/NavigationBar.vue";
import PageHeader from "@/components/bar/PageHeader.vue";
import { useRoute } from "vue-router";

const route = useRoute();

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
