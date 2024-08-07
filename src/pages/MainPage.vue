<script lang="ts" setup>
import PickButton from "@/components/button/PickButton.vue";
import SubscribeButton from "@/components/button/SubscribeButton.vue";
import ReviewRegisterButton from "@/components/button/ReviewRegisterButton.vue";
import CalendarIcon from "@/components/calendar/CalendarIcon.vue";
import CalendarView from "@/components/calendar/CalendarView.vue";
import BookCoverUploadCard from "@/components/card/BookCoverUploadCard.vue";
import BookFeedCard from "@/components/card/BookFeedCard.vue";
import BookPickedCard from "@/components/card/BookPickedCard.vue";
import { Book } from "@/dto/Book";
import BookSearchResultCard from "@/components/card/BookSearchResultCard.vue";
import BookRecommendCard from "@/components/card/BookRecommendCard.vue";
import ReviewDetailCard from "@/components/card/ReviewDetailCard.vue";
import { Review } from "@/dto/Review";

const book: Book = {
  bookId: 1,
  title: "책 제목",
  authorName: "작가 이름",
  introduction: "책 소개",
  isbn: "1234567890987",
  publisher: "출판사",
  categories: ["NOVEL", "ART_BOOK"],
  coverImageUrl: require("@/assets/test/picture_test.png"),
  createdAt: new Date(),
  pickCount: 0,
  isIndie: true,
  isPermitted: true,
};

const review: Review = {
  reviewId: 1,
  memberId: 1,
  nickname: "닉네임",
  bookId: 1,
  bookTitle: "책 제목",
  reviewTitle: "서평 제목",
  reviewContent: "서평 내용",
  pickCount: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
</script>

<template>
  <div style="padding: 15px 0">
    <h1>컴포넌트 모음</h1>
    <div style="display: flex; justify-content: center; flex-direction: column">
      <div class="component-wrapper">
        <h3>버튼 컴포넌트</h3>
        <div class="component-list">
          <h5>픽 버튼</h5>
          <PickButton :is-picked="false" :pick-count="0" />
          <h5>구독버튼</h5>
          <SubscribeButton :is-subscribed="false" />
          <h5>서평쓰기버튼</h5>
          <ReviewRegisterButton
            :review="{
              memberId: 1,
              bookId: 1,
              reviewTitle: '서평제목',
              reviewContent: '서평본문',
            }"
          />
        </div>
      </div>
      <div>
        <h3>캘린더 컴포넌트</h3>
        <div style="display: flex">
          <h5>캘린더 날짜 카드</h5>
          <CalendarIcon day="1" type="notChecked" />
          <CalendarIcon day="1" type="checked" />
          <CalendarIcon day="1" type="todayChecked" />
          <CalendarIcon day="1" type="todayNotChecked" />
          <CalendarIcon day="1" type="notInMonth" />
          <CalendarIcon day="1" type="weekday" />
        </div>
        <h3>캘린더 뷰</h3>
        <CalendarView :month="8" :year="2024" />
      </div>
      <div>
        <h3>카드</h3>
        <div>
          <h5>도서 커버 업로드 카드</h5>
          <BookCoverUploadCard />
          <h5>도서 피드 카드</h5>
          <BookFeedCard :book="book" :is-picked="true" />
          <h5>도서픽 카드</h5>
          <BookPickedCard :book="book" />
          <h5>도서 검색 결과 카드</h5>
          <BookSearchResultCard :book="book" />
          <h5>추천 도서 카드</h5>
          <BookRecommendCard :book="book" />
          <h5>서평 디테일 카드</h5>
          <ReviewDetailCard :review="review" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.component-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

h3 {
  background-color: #36ad6c;
  color: white;
}

h5 {
  background-color: #1f5b3a;
  color: white;
}
</style>
