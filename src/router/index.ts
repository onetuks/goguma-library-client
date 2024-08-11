import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "@/pages/login/LoginPage.vue";
import SamplePage from "@/pages/SamplePage.vue";
import LoginHandler from "@/pages/login/LoginHandlerView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: SamplePage },
  { path: "/sample", component: SamplePage },
  { path: "/login", component: LoginPage },
  { path: "/login/oauth2/callback", component: LoginHandler },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
