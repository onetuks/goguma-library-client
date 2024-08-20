import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SamplePage from "@/pages/SamplePage.vue";
import ReviewItemPage from "@/pages/book/review/ReviewItemPage.vue";
import LoginHandlerView from "@/pages/login/handler/LoginHandlerView.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import BookRegistrationPage from "@/pages/book/registration/BookRegistrationPage.vue";
import ProfileSettingPage from "@/pages/my/ProfileSettingPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "고구마서재", component: SamplePage },
  { path: "/sample", name: "컴포넌트 샘플 페이지", component: SamplePage },
  { path: "/login", name: "로그인", component: LoginPage },
  {
    path: "/login/oauth2/callback/:provider",
    name: "로그인 핸들러",
    component: LoginHandlerView,
  },
  {
    path: "/members/:memberId/settings",
    name: "프로필수정",
    component: ProfileSettingPage,
  },
  { path: "/books/:bookId", name: "도서정보", component: BookInformationPage },
  { path: "/reviews/:reviewId", name: "서평정보", component: ReviewItemPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
