import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "project",
    component: () => import("@/pages/ProjectPage.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/pages/SignupPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/LoginPage.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router