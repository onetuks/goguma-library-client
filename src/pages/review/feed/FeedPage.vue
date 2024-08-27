<script setup lang="ts">
import { Review, ReviewApis } from "@/api/ReviewApis";
import FeedCard from "@/components/card/BookFeedCard.vue";
import SortRecentBestButton from "@/components/select/SortRecentBestButton.vue";
import { ref, onMounted } from "vue";
import { emptyPage, Page } from "@/types/Page";
import { SortType } from "@/types/SortType";

// 다 이해했으면 주석 모두 지워주세요

// 만약에 절대로 변하지 않을 상수값이 있으면 이쪽에 선언하는게 좋아요

// 생명주기 함수는 가급적 컴포넌트 위쪽에 있는게 좋아요
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 지역변수는 이렇게 모아두면 좋아요
// ref메소드 뒤에 항상 타입을 지정해야, 컴파일 에러가 발생해요. (그래야 나중에 편해져요)
// const reviewPage: Page<Review> = ref(emptyPage());  이렇게 해도 되긴하는데, 권장하지는 않아요.
const reviewPage = ref<Page<Review>>(emptyPage()); // 페이지 데이터가 있는 서평 페이지
const reviews = ref<Review[]>([]); // 스크롤 시 기존 서평 + 추가된 서평 유지하기 위한 서평 배열
const sortType = ref<SortType>("LATEST"); // 정렬 기준 (최신 서평 / 베스트 서평)

// 피드에 제공할 서평목록을 조회하는거에요
// async await 은 항상 짝꿍이에요 Promise 래퍼 객체를 반환하고, 비동기 처리를 가능하게 해줘요
// 비동기는 쉽게 말해서 요청은 해놓고 응답을 기다리지 않는거에요. 언젠가 오겠지~~ 라는 생각으로 다른 일을 할 수 있어요.
const fetchReviews = async (): Promise<void> => {
  await ReviewApis.getReviews(
    sortType.value,
    reviewPage.value?.number,
    reviewPage.value?.size
  ).then((responses) => {
    // 비동기 데이터는 성공적으로 데이터를 불러오면 then 절에서 받아요.
    // 여기서 컴포넌트 지역변수(ref로 선언한거)에 주입해주는거에요.
    // 위에 responses 를 보면 Page<ReviewResponse> 타입이에요.
    // 우리가 필요한건 Page<Review> 라서 as 키워드로 변환했어요.
    // as 를 쓸 수 있는 이유는 ReviewResponse 와 Review 가 모든 필드가 정확히 일치하기 때문이에요.
    // 사실상 같은 객체로 봐도 무방해요.
    // console.log 로 제대로 동작하는지 디버깅하면서 진행하면 돼요.
    // 뭔가 데이터가 안온다 싶으면 localhost:8000/reviews/registration 에서 서평 등록해서 조회하세요.
    // 만약에 서평 작성이 안 된다 싶으면 localhost:8000/books/registration 에서 서평 등록해서 조회하세요.
    // 만약 도서 등록이 안 된다 싶으면 localhost:8000/login 에서 로그인하고 등록하세요.
    console.log("fetchReviews", responses);
    const data = responses as Page<Review>;
    reviewPage.value = data;
    reviews.value.concat(data.content);
  });
};

function handleScroll() {
  const bottomOffset = 10; // 페이지 하단으로부터의 오프셋 (px)

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - bottomOffset
  ) {
    // Page 타입 선언해놓은거 보면서 각 필드가 어떤 의미인지 알아보세요.
    // 그러면 이게 뭔 소린지 이해될거에요. 3분이면 봄.
    reviewPage.value.number += 1;
    fetchReviews();
  }
}

// composition api 에서는 생명주기가 크게 3개 있어요. setup, onBeforeMount, onMounted 나머지는 몰라도 돼요.
// composition api 에서는 모든 스크립트 코드가 setup 안에 들어가요.
// 그리고 setup > onBeforeMount > onMounted 순으로 실행돼요.
// 다시 말해서 위에 있는 코드와 아래에 있는 코드가 성공적으로 실행되려면 setup 생명주기 안에서 fetch 가 실행되야해요.
// 그래서 여기에 fetchReviews() 메소드를 실행시킨거에요.
fetchReviews();
</script>

<template>
  <div class="feed-page">
    <!--  이미 헤더가 있어서 더 쓰면 안돼요(제거요망)  -->
    <header>
      <SortRecentBestButton />
    </header>

    <div class="feed-cards">
      <!--   삽입된 컴포넌트에서 요구하는대로 prop 을 넣어줘야 해요. 지피티 멀리하고 이정도는 혼자 짜야해요.   -->
      <FeedCard
        v-for="(review, index) in reviews"
        :key="index"
        :username="review.username"
        :title="review.reviewTitle"
        :content="review.reviewContent"
        :date="review.updatedAt"
        :initialLikes="review.likes"
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
