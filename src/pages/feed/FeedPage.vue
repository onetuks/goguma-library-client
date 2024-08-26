<script setup lang="ts">
import FeedCard from "@/components/card/BookFeedCard.vue";
import SortRecentBestButton from "@/components/select/SortRecentBestButton.vue";
import { ref, onMounted } from "vue";

const currentTab = ref("latest");

const feeds = ref([
  {
    username: "치킨인더콘",
    title: "제목이 들어가는 영역",
    content: "본문 미리보기가 들어갑니다",
    date: "YYYY.MM.DD",
    likes: 1,
  },
  {
    username: "치킨인더콘",
    title: "제목이 들어가는 영역",
    content: "본문 미리보기가 들어갑니다",
    date: "YYYY.MM.DD",
    likes: 1,
  },
  {
    username: "치킨인더콘",
    title: "제목이 들어가는 영역",
    content: "본문 미리보기가 들어갑니다",
    date: "YYYY.MM.DD",
    likes: 1,
  },
]);

const currentPage = ref(1);
const pageSize = 3; // 한 번에 가져올 피드 개수

// 실제 API 호출로 교체할 수 있는 더미 데이터 추가 함수
function loadMoreFeeds() {
  for (let i = 0; i < pageSize; i++) {
    feeds.value.push({
      username: "추가된 유저",
      title: `추가된 제목 ${feeds.value.length + 1}`,
      content: "추가된 본문 미리보기",
      date: "YYYY.MM.DD",
      likes: feeds.value.length + 1,
    });
  }
}

function handleScroll() {
  const bottomOffset = 10; // 페이지 하단으로부터의 오프셋 (px)

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - bottomOffset
  ) {
    currentPage.value++;
    loadMoreFeeds();
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

function setTab(tab: string) {
  currentTab.value = tab;
  // 탭 변경에 따라 다른 피드 데이터를 가져오는 로직을 추가할 수 있습니다.
}
</script>

<template>
  <div class="feed-page">
    <header>
      <SortRecentBestButton :currentTab="currentTab" @setTab="setTab" />
    </header>

    <div class="feed-cards">
      <FeedCard
        v-for="(feed, index) in feeds"
        :key="index"
        :username="feed.username"
        :title="feed.title"
        :content="feed.content"
        :date="feed.date"
        :initialLikes="feed.likes"
      />
    </div>
  </div>
</template>

<style scoped>
.feed-page {
  color: var(--text-secondary);
  max-width: 390px;
  margin: 0 auto;
  padding-bottom: 60px;
  overflow-y: hidden;
  height: auto;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.feed-cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}
</style>
