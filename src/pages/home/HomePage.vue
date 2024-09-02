<script setup lang="ts">
import router from "@/router";
import SearchBar from "@/pages/book/search/components/SearchBar.vue";
import MainPageHeader from "@/components/bar/MainPageHeader.vue";
import WeeklyFeaturedBooksView from "@/pages/home/components/view/WeeklyFeaturedBooksView.vue";
import FeaturedFunctionsView from "@/pages/home/components/view/FeaturedFunctionsView.vue";
import ReviewRecommendedView from "@/pages/home/components/view/ReviewRecommendedView.vue";
import BookRecommendedView from "@/pages/home/components/view/BookRecommendedView.vue";

const moveToBookSearchPage = (): void => {
  router.push("/books/search");
};
</script>

<template>
  <div class="main-page-container">
    <MainPageHeader page-title="메인화면" />
    <SearchBar @search:Books="moveToBookSearchPage" />
    <div class="main-page-body">
      <WeeklyFeaturedBooksView />
      <FeaturedFunctionsView />
      <ReviewRecommendedView />
      <BookRecommendedView />
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
