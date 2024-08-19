<template>
  <PageHeader :header-title="getPageTitle()" />
  <nav>
    <router-link to="/" />
  </nav>
  <router-view />
  <NavigationBar class="nav-bar" />
</template>

<style>
@import "@/styles/colors.css"; /* 색상 변수 정의 CSS 파일 */
@import "https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css";

body,
html,
#app {
  margin: 0 0 70px;
  padding: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  font-family: "NanumSquare", sans-serif; /* 나눔스퀘어를 기본 폰트로 설정 */
  text-align: center;
  background-color: var(--background-primary);
  color: var(--text-primary);
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
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
</script>
