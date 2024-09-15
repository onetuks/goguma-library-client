<script setup lang="ts">
import { Book } from "@/api/BookApis";
import { emptyPage, Page } from "@/types/Page";
import { AdminBookApis } from "@/api/AdminBookApis";
import { ref } from "vue";
import PaginationBar from "@/components/bar/PaginationBar.vue";
import router from "@/router";

const books = ref<Page<Book>>(emptyPage());

const moveToAdminBookModificationPage = (bookId: number): void => {
  router.push(`/admin/books/${bookId}/modification`);
};

const removeBook = async (bookId: number): Promise<void> => {
  await AdminBookApis.deleteBook(bookId)
    .then(() => alert("도서가 성공적으로 삭제되었습니다."))
    .catch((error) => console.error("AdminHomePage.removeBook", error));
};

const fetchBooksForInspection = async (page: number): Promise<void> => {
  await AdminBookApis.getBooksForInspection(true, page)
    .then((response) => {
      console.log(response);
      books.value = { ...response } as Page<Book>;
    })
    .catch((error) =>
      console.error("AdminHomePage.fetchBooksForInspection", error)
    );
};
</script>

<template>
  <div class="admin-book-list-page-container">
    <table class="admin-book-list-page-table">
      <tr>
        <th>제목</th>
        <th>ISBN</th>
        <th>수정/삭제</th>
      </tr>
      <tbody>
        <tr v-for="(book, index) in books.content" :key="index">
          <td class="admin-book-list-page-title">{{ book.title }}</td>
          <td class="admin-book-list-page-isbn">
            {{ book.isbn ? book.isbn : "NaN" }}
          </td>
          <td class="admin-book-list-page-button-container">
            <div
              class="admin-book-list-page-button"
              v-if="book.bookId"
              @click="moveToAdminBookModificationPage(book.bookId)"
            >
              수정
            </div>
            <div
              class="admin-book-list-page-button"
              v-if="book.bookId"
              @click="removeBook(book.bookId)"
            >
              삭제
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationBar :page-info="books" @request:Page="fetchBooksForInspection" />
  </div>
</template>

<style scoped>
.admin-book-list-page-container {
  padding: 13px 15px;
  width: 100%;
}

.admin-book-list-page-table {
  width: 100%;
}

.admin-book-list-page-table th,
.admin-book-list-page-table td {
  border-bottom: 1px solid var(--border-primary);
  height: 50px;
}

.admin-book-list-page-title {
  width: 50%;
}

.admin-book-list-page-isbn {
  width: 20%;
}

.admin-book-list-page-button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.admin-book-list-page-button {
  border: 1px solid var(--button-primary);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-left: 5px;
}
</style>
