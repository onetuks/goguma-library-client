<script setup lang="ts">
import { ref } from "vue";
import { Book } from "@/api/BookApis";
import { emptyPage, Page } from "@/types/Page";
import { AdminBookApis } from "@/api/AdminBookApis";
import router from "@/router";

const books = ref<Page<Book>>(emptyPage());

const moveToAdminBookRegistration = () => {
  router.push("/admin/books/registration");
};

const moveToAdminBookListPage = () => {
  router.push("/admin/books");
};

const moveToAdminNotificationRegistration = () => {
  router.push("/admin/notifications/registration");
};

const fetchBooksForInspection = async (): Promise<void> => {
  await AdminBookApis.getBooksForInspection(true, books.value.number)
    .then((response) => {
      books.value = { ...response } as Page<Book>;
    })
    .catch((error) =>
      console.error("AdminHomePage.fetchBooksForInspection", error)
    );
};

fetchBooksForInspection();
</script>

<template>
  <div class="admin-home-page-container">
    <div class="admin-home-page-statics-container">
      <div class="admin-home-page-statics-title">미검수도서 현황</div>
      <div class="admin-home-page-statics-content">
        <div class="admin-home-page-statics-item">
          미검수도서: {{ books.totalElements }}건
        </div>
      </div>
    </div>
    <div class="admin-home-page-button" @click="moveToAdminBookRegistration">
      신규도서등록
    </div>
    <div class="admin-home-page-button" @click="moveToAdminBookListPage">
      등록도서수정
    </div>
    <div
      class="admin-home-page-button"
      @click="moveToAdminNotificationRegistration"
    >
      신규알림등록
    </div>
  </div>
</template>

<style scoped>
.admin-home-page-container {
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.admin-home-page-statics-container {
  width: 100%;
  border-radius: 20px;
  border: 1px solid var(--border-tertiary);
  background-color: var(--surface-fourth);
}

.admin-home-page-statics-title {
  font-size: 24px;
  font-family: var(--font-family-bold), sans-serif;
  color: var(--text-fourth);
  padding: 10px;
  border-radius: 20px 20px 0 0;
  background-color: var(--surface-sixth);
}

.admin-home-page-statics-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 13px;
  font-size: 16px;
  font-family: var(--font-family-bold), sans-serif;
  padding: 13px 10px;
  text-align: left;
  width: 100%;
}

.admin-home-page-statics-item {
  width: 100%;
}

.admin-home-page-button {
  width: 100%;
  padding: 16px 0;
  border: 2px solid var(--button-secondary);
  border-radius: 15px;
  margin-top: 10px;
}
</style>
