import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/components/HelloWorld.vue';
import Dashboard from '../views/Dashboard.vue';
import ManageAdaptor from '../views/ManageAdaptor.vue'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Dashboard
  }, {
    path: '/manage',
    component: ManageAdaptor
  }
]

export default createRouter({
  routes: routes,
  history: createWebHashHistory()
})