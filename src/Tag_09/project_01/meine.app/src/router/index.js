// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoView from '../views/TodoView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/',       component: HomeView  },
  { path: '/todos',  component: TodoView  },
  { path: '/about',  component: AboutView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router