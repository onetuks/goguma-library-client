import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginHandlerView from "@/pages/login/handler/LoginHandlerView.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import ProfileSettingPage from "@/pages/my/setting/ProfileSettingPage.vue";
import ErrorPage from "@/pages/error/ErrorPage.vue";
import WarningPage from "@/pages/error/WarningPage.vue";
import MyProfilePage from "@/pages/my/mypage/MyProfilePage.vue";
import BookRegistrationPage from "@/pages/book/registration/BookRegistrationPage.vue";
import PointPage from "@/pages/my/point/PointPage.vue";
import BookInfoPage from "@/pages/book/info/BookInfoPage.vue";
import ReviewPickListPage from "@/pages/review/list/ReviewPickListPage.vue";
import MyReviewListPage from "@/pages/review/list/MyReviewListPage.vue";
import ReviewDetailPage from "@/pages/review/detail/ReviewDetailPage.vue";
import ReviewOfBookListPage from "@/pages/review/list/ReviewOfBookListPage.vue";
import FollowerListPage from "@/pages/my/follow/FollowerListPage.vue";
import FollowingListPage from "@/pages/my/follow/FollowingListPage.vue";
import BookPickListPage from "@/pages/book/list/BookPickListPage.vue";
import BookSearchPage from "@/pages/book/search/BookSearchPage.vue";
import MyStudyPage from "@/pages/study/my/MyStudyPage.vue";
import OthersStudyPage from "@/pages/study/other/OthersStudyPage.vue";
import ReviewRegistrationPage from "@/pages/review/registration/ReviewRegistrationPage.vue";
import ReviewEditPage from "@/pages/review/registration/ReviewEditPage.vue";
import WithdrawPage from "@/pages/login/WithdrawPage.vue";
import AlarmListPage from "@/pages/my/alarm/AlarmListPage.vue";
import HomePage from "@/pages/home/HomePage.vue";
import ReviewFeedPage from "@/pages/review/feed/ReviewFeedPage.vue";
import AdminHomePage from "@/pages/admin/home/AdminHomePage.vue";
import AdminBookListPage from "@/pages/admin/book/list/AdminBookListPage.vue";
import AdminBookModificationPage from "@/pages/admin/book/modification/AdminBookModificationPage.vue";
import AdminBookRegistrationPage from "@/pages/admin/book/modification/AdminBookRegistrationPage.vue";

const routes: Array<RouteRecordRaw> = [
  // 기본 페이지
  { path: "/", name: "고구마서재", component: HomePage },
  { path: "/feeds", name: "피드", component: ReviewFeedPage },

  // 예외 페이지
  { path: "/error", name: "", component: ErrorPage },
  { path: "/warning", name: "", component: WarningPage },

  // 로그인
  { path: "/login", name: "로그인", component: LoginPage },
  {
    path: "/login/oauth2/callback/:provider",
    name: "로그인 핸들러",
    component: LoginHandlerView,
  },
  {
    path: "/withdraw",
    name: "회원탈퇴",
    component: WithdrawPage,
  },

  // 마이페이지
  {
    path: "/members/my/settings",
    name: "프로필 설정",
    component: ProfileSettingPage,
  },
  {
    path: "/members/my/points",
    name: "포인트 적립 내역",
    component: PointPage,
  },
  {
    path: "/members/my/alarms",
    name: "알림 내역",
    component: AlarmListPage,
  },
  {
    path: "/members/:memberId/profiles",
    name: "마이페이지",
    component: MyProfilePage,
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
    path: "/reviews/:reviewId/modification",
    name: "서평 수정",
    component: ReviewEditPage,
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
    component: ReviewOfBookListPage,
    props: (route) => ({ bookId: route.query["book-id"] }),
  },
  {
    path: "/reviews/:reviewId",
    name: "서평",
    component: ReviewDetailPage,
  },

  // 관리자
  {
    path: "/admin/home",
    name: "관리자 홈",
    component: AdminHomePage,
  },
  {
    path: "/admin/books",
    name: "미검수 도서 조회",
    component: AdminBookListPage,
  },
  {
    path: "/admin/books/:bookId/modification",
    name: "도서 수정",
    component: AdminBookModificationPage,
  },
  {
    path: "/admin/books/registration",
    name: "도서 등록",
    component: AdminBookRegistrationPage,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
