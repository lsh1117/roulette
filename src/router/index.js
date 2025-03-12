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
      },
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: () => import(/* webpackChunkName: "portfolio" */ '../views/Portfolio.vue'),
        meta: { hidden: true }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
