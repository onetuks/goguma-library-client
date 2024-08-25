<script lang="ts" setup>
import PickButton from "@/components/button/ReviewPickButton.vue";
import SubscribeButton from "@/components/button/SubscribeButton.vue";
import ReviewRegisterButton from "@/components/button/ReviewRegisterButton.vue";
import CalendarIcon from "@/components/calendar/CalendarIcon.vue";
import BookFeedCard from "@/components/card/BookFeedCard.vue";
import BookPickedCard from "@/components/card/BookPickedCard.vue";
import BookSearchResultCard from "@/components/card/BookSearchResultCard.vue";
import BookRecommendCard from "@/components/card/BookRecommendCard.vue";
import ReviewDetailCard from "@/components/card/ReviewDetailCard.vue";
import ReviewPreviewCard from "@/components/card/ReviewPreviewCard.vue";
import PageHeader from "@/components/bar/PageHeader.vue";
import SortSelect from "@/components/select/SortSelect.vue";
import ProfileImageSettingCard from "@/pages/my/setting/components/ProfileImageSettingView.vue";
import { Review } from "@/types/Review";
import { Member } from "@/api/MemberApis";
import { Book } from "@/api/BookApis";

const member: Member = {
  memberId: 1_000,
  nickname: "고구마침팬치",
  introduction: "열혈 침팬치",
  instagramUrl: "https://www.instagram.com/gogumachim",
  interestedCategories: ["CARTOON", "NOVEL"],
  isAlarmAccepted: true,
  points: 100,
  profileImageUrl:
    "https://goguma-chimpanzee.s3.ap-northeast-2.amazonaws.com/profiles/default-profile.png",
  profileBackgroundImageUrl:
    "https://goguma-chimpanzee.s3.ap-northeast-2.amazonaws.com/profile-backgrounds/default-profile-background.png",
  memberStatics: {
    memberStaticsId: 1_000,
    reviewCounts: 1,
    followerCounts: 1,
    followingCounts: 12,
    reviewCategoryCounts: [
      ["ALL", 1],
      ["ETC", 1],
      ["POETRY", 1],
      ["ESSAY", 1],
      ["TRAVEL", 1],
      ["PHOTO", 1],
      ["ILLUSTRATION", 1],
      ["CARTOON", 1],
      ["MAGAZINE", 1],
      ["NOVEL", 1],
      ["ART_BOOK", 1],
      ["NON_LITERATURE", 1],
    ],
  },
};

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
  <div style="padding: 100px 0 200px 0">
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
          <ReviewRegisterButton :review="review" />
        </div>
      </div>
      <div>
        <h3>캘린더 컴포넌트</h3>
        <div style="display: flex">
          <h5>캘린더 날짜 카드</h5>
          <CalendarIcon day="1" type="DEFAULT" />
          <CalendarIcon day="1" type="ATTENDED" />
          <CalendarIcon day="1" type="TODAY_ATTENDED" />
          <CalendarIcon day="1" type="TODAY_NOT_ATTENDED" />
          <CalendarIcon day="1" type="NOT_THIS_MONTH" />
          <CalendarIcon day="1" type="DATE" />
        </div>
      </div>
      <div>
        <h3>카드</h3>
        <div>
          <h5>도서 커버 업로드 카드</h5>
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
          <h5>서평 미리보기 카드</h5>
          <ReviewPreviewCard :review="review" :book="book" />
          <h5>프로필 이미지 카드</h5>
          <ProfileImageSettingCard :member="member" />
        </div>
      </div>
      <div>
        <h3>페이지 바</h3>
        <div>
          <h5>페이지 헤더 바</h5>
          <PageHeader header-title="작성 서평" />
          <PageHeader header-title="서평 Pick" />
        </div>
      </div>
      <div>
        <h3>셀렉트</h3>
        <div>
          <h5>정렬 셀렉트</h5>
          <SortSelect />
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
