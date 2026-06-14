import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: '',
        component: () => import("@/views/HomeView.vue")
      },
      {
        path: 'mods',
        component: () => import("@/views/ModView.vue")
      },
      {
        path: 'tutor',
        component: () => import("@/views/TutorView.vue")
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
