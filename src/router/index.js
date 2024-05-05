import Vue from 'vue'
import VueRouter from 'vue-router'

// LOGIN
import loginMain from '../views/login/login-main.vue'
import signIn from '../views/login/sign-in.vue'

// HOME
import homeMain from '../views/main/home-main.vue'
import home from '../views/main/home-dashboard.vue'

//ADMIN
import adminMain from '../views/main/admin/admin-main.vue'

//USER
import userMain from '../views/main/user/user-main.vue'

//MODELOS
import modelView from "@/views/main/modelos/model.view.vue"
import inputView from "@/views/main/modelos/components/input-view.vue"

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: { name: 'sign-in', path: '/sign-in' }
  },
  {
    path: '/login',
    component: loginMain,
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: signIn
      }
    ]
  },

  {
    path: '/main',
    component: homeMain,
    children: [
      {
        path: "" || "/",
        redirect: { name: 'home-dashboard' }
      },
      {
        path: 'home',
        name: 'home-dashboard',
        component: home
      },
      {
        path: "modelos",
        name: 'model-view',
        component: modelView,
        children: [
          {
            path: "" || "/",
            redirect: { name: 'input-view' }
          },
          {
            path: 'inputs',
            name: 'input-view',
            component: inputView
          },
        ]
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin-main',
    component: adminMain,
  },
  {
    path: '/user',
    name: 'user-main',
    component: userMain,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
