import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/home/HomePage.vue";
import SamplePage from "@/pages/SamplePage.vue";
import LoginHandlerView from "@/pages/login/handler/LoginHandlerView.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import ProfileSettingPage from "@/pages/my/setting/ProfileSettingPage.vue";
import ErrorPage from "@/pages/error/ErrorPage.vue";
import WarningPage from "@/pages/error/WarningPage.vue";
import MyProfilePage from "@/pages/my/mypage/MyProfilePage.vue";
import BookRegistrationPage from "@/pages/book/registration/BookRegistrationPage.vue";
import PointPage from "@/pages/my/point/PointPage.vue";
import BookInfoPage from "@/pages/book/info/BookInfoPage.vue";
import ReviewRegistrationPage from "@/pages/review/registration/ReviewRegistrationPage.vue";
import ReviewPickListPage from "@/pages/review/list/ReviewPickListPage.vue";
import MyReviewListPage from "@/pages/review/list/MyReviewListPage.vue";
import ReviewDetailPage from "@/pages/review/detail/ReviewDetailPage.vue";
import BookReviewListPage from "@/pages/review/list/BookReviewListPage.vue";
import FollowerListPage from "@/pages/my/follow/FollowerListPage.vue";
import FollowingListPage from "@/pages/my/follow/FollowingListPage.vue";
import BookPickListPage from "@/pages/book/list/BookPickListPage.vue";
import BookSearchPage from "@/pages/book/search/BookSearchPage.vue";
import MyStudyPage from "@/pages/study/MyStudyPage.vue";
import OthersStudyPage from "@/pages/study/OthersStudyPage.vue";

const routes: Array<RouteRecordRaw> = [
  // 기본 페이지
  { path: "/", name: "고구마서재", component: SamplePage },
  { path: "/home", name: "메인화면", component: HomePage },
  { path: "/error", name: "", component: ErrorPage },
  { path: "/warning", name: "", component: WarningPage },
  { path: "/sample", name: "컴포넌트 샘플 페이지", component: SamplePage },

  // 로그인
  { path: "/login", name: "로그인", component: LoginPage },
  {
    path: "/login/oauth2/callback/:provider",
    name: "로그인 핸들러",
    component: LoginHandlerView,
  },

  // 마이페이지
  {
    path: "/members/:memberId/settings",
    name: localStorage.getItem("isNewMember") ? "회원가입" : "프로필수정",
    component: ProfileSettingPage,
  },
  {
    path: "/members/:memberId/profiles",
    name: "마이페이지",
    component: MyProfilePage,
  },
  {
    path: "/members/:memberId/points",
    name: "포인트 적립 내역",
    component: PointPage,
  },
  {
    path: "/members/:memberId/follows",
    name: "팔로우",
    component: FollowerListPage,
  },
  {
    path: "/members/:memberId/followings",
    name: "팔로잉",
    component: FollowingListPage,
  },

  // 서재
  {
    path: "/study/my",
    name: "나의 서재",
    component: MyStudyPage,
  },
  {
    path: "/study",
    name: "님의 서재",
    component: OthersStudyPage,
    props: (route) => ({ memberId: route.query["member-id"] }),
  },

  // 도서
  {
    path: "/books/registration",
    name: "도서등록",
    component: BookRegistrationPage,
  },
  {
    path: "/books/:bookId/info",
    name: "도서 정보",
    component: BookInfoPage,
  },
  {
    path: "/books/search",
    name: "도서 검색",
    component: BookSearchPage,
  },
  {
    path: "/books/picks",
    name: "북 Pick",
    component: BookPickListPage,
  },

  // 서평
  {
    path: "/reviews/registration",
    name: "서평 작성",
    component: ReviewRegistrationPage,
    props: (route) => ({ bookId: route.query["book-id"] }),
  },
  {
    path: "/reviews/my",
    name: "나의 서평",
    component: MyReviewListPage,
  },
  {
    path: "/reviews/picks",
    name: "서평 Pick",
    component: ReviewPickListPage,
  },
  {
    path: "/reviews",
    name: "도서 서평",
    component: BookReviewListPage,
    props: (route) => ({ bookId: route.query["book-id"] }),
  },
  {
    path: "/reviews/:reviewId",
    name: "서평",
    component: ReviewDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
