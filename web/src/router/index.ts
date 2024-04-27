import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/HelloWorld.vue';
import Dashboard from '../views/Dashboard.vue';
import Manage from '../views/Manage.vue';
const routes = [
  {
    path: '/',
    redirect: '/manage'
  },
  {
    path: '/dashboard',
    component: Dashboard
  }, {
    path: '/manage',
    component: Manage
  }
]

export default createRouter({
  routes: routes,
  history: createWebHashHistory()
})