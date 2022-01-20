import Vue from 'vue'
import Router from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import Login from '@/components/Login.vue'
import NotebookList from '@/components/NotebookList.vue'
import NoteDetail from '@/components/NoteDetail.vue'
import TrashDetail from '@/components/TrashDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sidebar',
      component: Sidebar
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/notebooks',
      name: 'notebooks',
      component: NotebookList
    },
    {
      path: '/note/:noteId',
      name: 'note',
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
      name: 'trash',
      component: TrashDetail
    }
  ]
})
