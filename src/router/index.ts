import TestView from '@/views/TestView.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: '',
        name: 'mod',
        component: () => import("@/views/ModView.vue")
      },
      {
        path: 'mods',
        redirect: "/"
      },
      {
        path: 'mods/:name',
        name: 'mod-details',
        component: () => import("@/views/ModDetails.vue")
      },
      {
        path: 'info',
        name: 'info',
        component: () => import("@/views/InfoView.vue")
      },
      {
        path: 'tutorial',
        name: 'tutorial',
        component: () => import("@/views/TutorView.vue")
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import("@/views/NotFound.vue")
      }
    ]
  }
]
if (import.meta.env.DEV && routes[0]?.children) {
  routes[0].children.push({
    path: 'test',
    component: TestView
  })
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from) {
    if ((_to.name === 'mod' && _from.name === 'mod-details') ||
      (_to.name === 'mod-details' && _from.name === 'mod'))
      return { left: 0, top: 0 }
  },
})
