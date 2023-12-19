import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '../views/LoginForm.vue'
import HomePage from '../views/HomePage.vue'
import SignupForm from '../views/SignupForm.vue'
import LogoutPage from '../views/LogoutPage.vue'
import ChatPage from '../views/ChatPage.vue'
import JoinGroup from '../views/JoinGroup.vue'
import PrivateChat from '../views/PrivateChat.vue'

const routes = [
  {
    path: '/',
    name: 'loginform',
    component: LoginForm
  },
  {
    path: '/Signup',
    name: 'signupform',
    component: SignupForm
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutPage
  },
  {
    path: '/chat/:groupId',
    name: 'chat',
    component: ChatPage,
    props: true
  },
  {
    path: '/joingroup',
    name: 'joingroup',
    component: JoinGroup
  },
  {
    path: '/privatechat/:groupId',
    name: 'privatechat',
    component: PrivateChat
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
