<script lang="ts" setup>
import router from "@/router";
import { LOGIN_ID } from "@/types/AuthWords";

const moveToMyProfilePage = (): void => {
  router.push(`/members/${localStorage.getItem(LOGIN_ID)}/profiles`);
};

const moveToServiceIntroduction = (): void => {
  window.open(
    "https://tender-bayberry-b98.notion.site/6cd40b6b417a49fcb726573283b5cfc0?pvs=4"
  );
};

const moveToBookStoreMap = (): void => {
  window.open("https://www.bookshopmap.com/");
};
</script>

<template>
  <div class="function-container">
    <img
      alt="attendance-banner"
      class="banner-image"
      src="../../../assets/banner/attendance-banner.png"
      @click="moveToMyProfilePage"
    />
    <img
      alt="introduction-banner"
      class="banner-image"
      src="../../../assets/banner/introduction-banner.png"
      @click="moveToServiceIntroduction"
    />
    <img
      alt="map-banner"
      class="banner-image"
      src="../../../assets/banner/map-banner.png"
      @click="moveToBookStoreMap"
    />
  </div>
</template>

<style scoped>
.function-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  padding: 25px 15px;
  background-color: var(--background-primary);
}
</style>
