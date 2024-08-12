import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SamplePage from "@/pages/SamplePage.vue";
import BookInformationPage from "@/pages/BookInformationPage.vue";
import LoginHandlerView from "@/pages/login/handler/LoginHandlerView.vue";
import LoginPage from "@/pages/login/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: SamplePage },
  { path: "/sample", component: SamplePage },
  { path: "/bookinformationpage", component: BookInformationPage },
  { path: "/login", component: LoginPage },
  { path: "/login/oauth2/callback/:provider", component: LoginHandlerView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
