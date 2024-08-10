<script setup lang="ts">
import SubscribeButton from "@/components/button/SubscribeButton.vue";
import PickButton from "@/components/button/PickButton.vue";
import { Book } from "@/types/Book";
import { formatDate } from "date-fns";

defineProps<{
  book: Book;
  isPicked: boolean;
}>();
</script>

<template>
  <div class="feed-card">
    <div class="card-image">
      <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
    </div>
    <div class="card-content">
      <div class="card-header">
        <img
          src="@/assets/test/profile_picture.png"
          alt="Profile"
          class="profile-picture"
        />
        <div class="user-info">
          <span class="username">{{ book.authorName }}</span>
          <SubscribeButton :is-subscribed="false" />
        </div>
        <PickButton :pick-count="book.pickCount" :is-picked="isPicked" />
      </div>
      <div class="card-body">
        <h2 class="title">{{ book.title }}</h2>
        <p class="content">{{ book.introduction }}</p>
      </div>
      <div class="card-footer">
        <span class="date">{{ formatDate(book.createdAt, "yyyy-MM-dd") }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-card {
  width: 360px;
  height: 532px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-image {
  flex: 3;
  position: relative;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  flex: 2;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.username {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.subscription-button {
  margin-left: 10px;
}

.heart-button {
  margin-left: auto;
}

.card-body {
  flex: 1;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

.content {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit the number of lines */
  -webkit-box-orient: vertical;
}

.card-footer {
  text-align: right;
  font-size: 12px;
  color: #888;
}
</style>
