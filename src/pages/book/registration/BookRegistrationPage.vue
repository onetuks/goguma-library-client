<script setup lang="ts">
import { ref } from "vue";
import BookRegistrationIsbnView from "@/pages/book/registration/components/BookRegistrationIsbnView.vue";
import BookRegistrationTitleView from "@/pages/book/registration/components/BookRegistrationTitleView.vue";
import { Book, initBook } from "@/api/BookApis";
import BookRegistrationAuthorNameView from "@/pages/book/registration/components/BookRegistrationAuthorNameView.vue";
import BookRegistrationPublisherView from "@/pages/book/registration/components/BookRegistrationPublisherView.vue";
import BookRegistrationNoticeView from "@/pages/book/registration/components/BookRegistrationNoticeView.vue";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";

const book = ref<Book>(initBook());
const coverImageFile = ref<File | null>(null);
const coverImageFilename = ref<string | null>(null);

const updateBook = (updatedBook: Book) => {
  book.value = updatedBook;
};

const updateCoverImageFile = (file: File) => {
  coverImageFile.value = file;
};

const updateCoverImageFilename = (filename: string) => {
  coverImageFilename.value = filename;
};
</script>

<template>
  <div class="book-registration-container">
    <BookRegistrationIsbnView />
    <BookRegistrationTitleView :book="book" @update:Book="updateBook" />
    <BookRegistrationAuthorNameView :book="book" @update:Book="updateBook" />
    <BookRegistrationPublisherView :book="book" @update:Book="updateBook" />
    <BookCoverUploadCard
      @update:CoverImageFile="updateCoverImageFile"
      @update:CoverImageFilename="updateCoverImageFilename"
    />
    <BookRegistrationNoticeView />
  </div>
</template>

<style scoped>
.book-registration-container {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  font-family: var(--font-family-regular), sans-serif;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
</style>
