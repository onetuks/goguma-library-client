<script setup lang="ts">
import ProfileHeader from "@/components/profile/FeedProfileHeader.vue";
import { format } from "date-fns";
import { computed } from "vue";
// import { Book, BookApis } from "@/api/BookApis";

const book = {
  title: "전차는 아프리카에서 전진한다",
  authorName: "치킨인더군",
  introduction:
    "서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다.서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다.서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다.",
  coverImageUrl: require("@/assets/test/picture_test.png"),
  createdAt: new Date(),
  pickCount: 1,
};

const truncatedTitle = computed(() => {
  const maxLength = 11;
  return book.title.length > maxLength
    ? book.title.substring(0, maxLength) + "..."
    : book.title;
});
</script>

<template>
  <div class="feed-card">
    <div class="card-image">
      <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
    </div>

    <div class="card-info">
      <ProfileHeader class="profile-header" />
      <div class="card-body">
        <h2 class="title">{{ truncatedTitle }}</h2>
        <p class="content">{{ book.introduction }}</p>
      </div>
      <div class="card-footer">
        <span class="date">{{ format(book.createdAt, "yyyy.MM.dd") }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-card {
  width: 30%;
  height: auto;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
}

.card-image {
  width: 100%;
  height: 100%;
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: auto;
  background: linear-gradient(
    180deg,
    rgba(234, 228, 216, 0.4) 0%,
    /* EAE4D8 at 40% opacity */ #fefdf6 50%,
    /* FEFDF6 at 100% opacity */ var(--background-primary) 100%
  );
  backdrop-filter: blur(2px); /* Background blur 효과 */
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.profile-header {
  margin-bottom: 10px;
}

.card-body {
  flex: 1;
}

.title {
  font-family: var(--font-family-kopub), sans-serif;
  font-size: 31px; /* 헤드라인 대_Kopub */
  color: var(--text-fourth);
  margin: 0 2px;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Drop shadow */
  text-align: left;
}

.content {
  font-family: var(--font-family-regular), sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 20px; /* 줄간격 20px */
  letter-spacing: 0%; /* Letter spacing 0% */
  margin-top: 10px; /* 제목과 서평 영역 사이 간격 10px */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄 표시 */
  -webkit-box-orient: vertical;
  text-align: left; /* 좌측 정렬 */
}

.card-footer {
  width: auto;
  height: auto;
  position: absolute;
  left: 15px; /* 좌단에서 15px 떨어짐 */
  bottom: 5px; /* 하단에서 5px 떨어짐 */
  top: auto; /* 상단 위치 설정 없음 */
  right: auto; /* 우측 위치 설정 없음 */
  font-size: 12px; /* 본문 소 */
  color: var(--text-fifth);
  text-align: left; /* 좌측 정렬 */
}
</style>
