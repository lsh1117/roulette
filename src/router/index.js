import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import DefaultLayout from '../components/layout/DefaultLayout.vue'

const routes = [
  {
    path: '/',
    redirect: "/home",
    component: DefaultLayout,
    children: [
      {
        path: 'home',
        name: 'HomeView',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
        meta: { hidden: true }
      }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(), 
  routes,
})

export default router
