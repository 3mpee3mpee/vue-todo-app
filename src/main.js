import Vue from 'vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'

import store from './store/store'
import axios from 'axios'
import {firestorePlugin} from 'vuefire'



import App from './App.vue'
import Login from './components/Auth/Login.vue'
import Sign from './components/Auth/Sign.vue'
import Todo from './components/Todo.vue'
import Tasks from './components/Tasks.vue'
import NotesModal from './components/NotesModal.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(firestorePlugin)

axios.defaults.baseURL = 'http://localhost:8000/api/'



const routes = [
  {
    path: '/',
    redirect: {
      path: '/login'
    },
  },
  {
    path: '/todo',
    component: Todo,
    name: 'todo',
    beforeEnter: (to, from, next) => {
      store.getters.IS_LOGGED ? next() : next('/login')
    },
    children: [
      {
        path: '/list/:id',
        components: {tasks: Tasks},
        name: 'tasks',
        children: [
          {
            path: 'task/:taskId',
            components: {notes: NotesModal},
            name: 'notes'

          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'
  },
  {
    path: '/signup',
    component: Sign,
    name: 'signup'
  },

]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/'
})


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
