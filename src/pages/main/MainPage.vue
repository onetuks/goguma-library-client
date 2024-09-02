<script setup lang="ts">
import router from "@/router";
import SearchBar from "@/pages/book/search/components/SearchBar.vue";
import MainPageHeader from "@/pages/main/components/common/MainPageHeader.vue";
import WeeklyFeaturedBooksView from "@/pages/main/components/view/WeeklyFeaturedBooksView.vue";
import FeaturedFunctionsView from "@/pages/main/components/view/FeaturedFunctionsView.vue";
import ReviewRecommendedView from "@/pages/main/components/view/ReviewRecommendedView.vue";
import BookRecommendedView from "@/pages/main/components/view/BookRecommendedView.vue";

const moveToBookSearchPage = (): void => {
  router.push("/books/search");
};
</script>

<template>
  <div class="main-page-container">
    <MainPageHeader />
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
