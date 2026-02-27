import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import AlumnosInscritos from '../views/alumnosInscritos.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/alumnos-inscritos',
    name: 'AlumnosInscritos',
    component: AlumnosInscritos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router