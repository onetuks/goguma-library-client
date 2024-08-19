import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SamplePage from "@/pages/SamplePage.vue";
import ReviewItemPage from "@/pages/book/review/ReviewItemPage.vue";
import LoginHandlerView from "@/pages/login/handler/LoginHandlerView.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import BookRegistrationPage from "@/pages/book/registration/BookRegistrationPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: SamplePage },
  { path: "/sample", component: SamplePage },
  { path: "/bookregistrationpage", component: BookRegistrationPage },
  { path: "/login", component: LoginPage },
  { path: "/login/oauth2/callback/:provider", component: LoginHandlerView },
  { path: "/reviewitempage", component: ReviewItemPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
