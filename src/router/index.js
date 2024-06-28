import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import UserIndex from '@/views/UserIndex.vue'
import SomeBooks from '@/views/Books/SomeBooks.vue'
import BookContent from '@/views/Books/BookContent.vue'

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: Login
  },
  {
    path: '/',
    component: Index
  },
  {
    path: '/index',
    name: 'IndexView',
    component: Index
  },
  {
    path: '/index/:username',
    name: 'UserIndex',
    component: UserIndex
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: Register
  },
  {
    path: '/AllBooks/:username',
    name: 'UserBookView',
    component: SomeBooks
  },
  {
    path: '/AllBooks',
    name: 'BookView',
    component: SomeBooks
  },
  {
    path: '/Books/:id',
    name: 'BookDetail',
    component: BookContent
  },
  {
    path: '/Books/:id/:username',
    name: 'BooksView',
    component: BookContent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
