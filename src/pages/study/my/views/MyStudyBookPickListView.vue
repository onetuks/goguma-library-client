<script lang="ts" setup>
import MyStudyTitleView from "@/pages/study/views/StudyTitleView.vue";
import { ref } from "vue";
import { Book } from "@/api/BookApis";
import { BookPickApis } from "@/api/BookPickApis";
import { Page } from "@/types/Page";
import BookPickPreviewCard from "@/components/card/BookPickPreviewCard.vue";
import ShowMoreButton from "@/components/button/ShowMoreButton.vue";
import router from "@/router";
import AddMoreButton from "@/components/button/AddMoreButton.vue";
import WarningPage from "@/pages/error/WarningPage.vue";

const books = ref<Book[]>([]);

const moveToBookPickListPage = (): void => {
  router.push("/books/picks");
};

const moveToBookBookSearchPage = (): void => {
  router.push("/books/search");
};

const fetchPickedBooks = async () => {
  await BookPickApis.getMyBookPicks().then(
    (response) => (books.value = (response as Page<Book>).content)
  );
};

fetchPickedBooks();
</script>

<template>
  <div class="my-study-book-pick-list-container">
    <MyStudyTitleView title="북 Pick" />
    <WarningPage v-if="books.length === 0" :is-visible-button="false" />
    <div v-else class="book-pick-list-container">
      <BookPickPreviewCard
        v-for="(book, index) in books"
        :key="index"
        :book="book"
      />
    </div>
    <ShowMoreButton
      v-if="books.length > 0"
      @move:ToShowMorePage="moveToBookPickListPage"
    />
    <AddMoreButton
      v-else
      action="픽할 도서 찾기"
      @move:ToAddMorePage="moveToBookBookSearchPage"
    />
  </div>
</template>

<style scoped>
.my-study-book-pick-list-container {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 15px;
  background-color: var(--background-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.book-pick-list-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
</style>
