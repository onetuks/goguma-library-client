<script setup lang="ts">
import { ref } from "vue";
import ProfileHeader from "@/components/profile/FeedProfileHeader.vue";
import { format } from "date-fns";

const book = {
  title: "제목이 들어가는 영역",
  authorName: "치킨인더군",
  introduction:
    "서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다. 서평이 들어가는 영역입니다.",
  coverImageUrl: require("@/assets/test/picture_test.png"),
  createdAt: new Date(),
  pickCount: 1,
};

const isPicked = ref(false);
</script>

<template>
  <div class="feed-card">
    <!-- 이미지 영역 -->
    <div class="card-image">
      <img :src="book.coverImageUrl" alt="Book Cover" class="book-cover" />
    </div>

    <!-- 정보 영역 -->
    <div class="card-info">
      <ProfileHeader class="profile-header" />
      <div class="card-body">
        <h2 class="title">{{ book.title }}</h2>
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
  width: 360px;
  height: 532px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 100%; /* 전체 카드 높이에 맞게 설정 */
}

.book-cover {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 전체 영역을 커버하면서 비율 유지 */
  object-position: center; /* 이미지 중앙을 기준으로 맞춤 */
}

.card-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 172px;
  background: linear-gradient(
    180deg,
    rgba(234, 228, 216, 0.4) 0%,
    /* EAE4D8 at 40% opacity */ #fefdf6 50%,
    /* FEFDF6 at 100% opacity */ var(--background-primary) 100%
  );
  backdrop-filter: blur(2px); /* Background blur 효과 */
  padding: 5px 15px 15px 15px;
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
  margin: 10px 0 10px 0; /* 상단 10px, 하단 10px 간격 추가 */
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Drop shadow */
  text-align: left; /* 좌측 정렬 */
}

.content {
  font-family: var(--font-family), sans-serif;
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
  width: 70px;
  height: 18px;
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
