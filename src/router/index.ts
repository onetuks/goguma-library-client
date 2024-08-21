import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/home/HomePage.vue";
import SamplePage from "@/pages/SamplePage.vue";
import LoginHandlerView from "@/pages/login/handler/LoginHandlerView.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import ProfileSettingPage from "@/pages/my/setting/ProfileSettingPage.vue";
import ErrorPage from "@/pages/error/ErrorPage.vue";
import WarningPage from "@/pages/error/WarningPage.vue";
import BookRegistrationPage from "@/pages/book/registration/BookRegistrationPage.vue";
import MyProfilePage from "@/pages/my/mypage/MyProfilePage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "고구마서재", component: SamplePage },
  { path: "/sample", name: "컴포넌트 샘플 페이지", component: SamplePage },
  { path: "/home", name: "메인화면", component: HomePage },
  { path: "/error", name: "", component: ErrorPage },
  { path: "/warning", name: "", component: WarningPage },
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
  {
    path: "/members/:memberId/profiles",
    name: "마이페이지",
    component: MyProfilePage,
  },
  {
    path: "/books/:bookId/registration",
    name: "도서등록",
    component: BookRegistrationPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
