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
@import "@/styles/font.css";
@import "https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css";

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
</script>
