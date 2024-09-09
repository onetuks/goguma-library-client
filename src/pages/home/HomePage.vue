<script setup lang="ts">
import router from "@/router";
import SearchBar from "@/components/bar/SearchBar.vue";
import MainPageHeader from "@/components/bar/MainPageHeader.vue";
import HomeWeeklyFeaturedBookView from "@/pages/home/views/HomeWeeklyFeaturedBookView.vue";
import HomeEtcFunctionView from "@/pages/home/views/HomeEtcFunctionView.vue";
import HomeReviewRecommendView from "@/pages/home/views/HomeReviewRecommendView.vue";
import HomeBookRecommendView from "@/pages/home/views/HomeBookRecommendView.vue";

const moveToBookSearchPage = (): void => {
  router.push("/books/search");
};
</script>

<template>
  <div class="main-page-container">
    <MainPageHeader page-title="메인화면" />
    <SearchBar @click="moveToBookSearchPage" />
    <div class="main-page-body">
      <HomeWeeklyFeaturedBookView />
      <HomeEtcFunctionView />
      <HomeReviewRecommendView />
      <HomeBookRecommendView />
    </div>
  </div>
</template>

<style scoped>
.main-page-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.main-page-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}
</style>
