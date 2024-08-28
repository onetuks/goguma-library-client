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
import PickedReviewsListPage from "@/pages/review/list/PickedReviewsListPage.vue";
import MyReviewsListPage from "@/pages/review/list/MyReviewsListPage.vue";
import ReviewDetailPage from "@/pages/review/detail/ReviewDetailPage.vue";
import BookReviewsListPage from "@/pages/review/list/BookReviewsListPage.vue";

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

  // 서평
  {
    path: "/reviews/registration",
    name: "서평 작성",
    component: ReviewRegistrationPage,
    props: (route) => ({ bookId: route.query["book-id"] }),
  },
  {
    path: "/reviews/my",
    name: "작성 서평",
    component: MyReviewsListPage,
  },
  {
    path: "/reviews/picks",
    name: "서평 Pick",
    component: PickedReviewsListPage,
  },
  {
    path: "/reviews",
    name: "도서 서평",
    component: BookReviewsListPage,
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
