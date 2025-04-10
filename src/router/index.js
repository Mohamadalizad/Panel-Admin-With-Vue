import { createRouter, createWebHistory } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'


import AdminIndex from '@/views/admin/AdminIndex.vue'

import UserIndex from '@/views/users/UserIndex.vue'
import AddUser from '@/views/users/AddUser.vue'
import EditUser from '@/views/users/EditUser.vue'

import IndexCategory from '@/views/category/IndexCategory.vue'
import AddCategory from '@/views/category/AddCategory.vue'
import EditCategory from '@/views/category/EditCategory.vue'

import IndexPost from '@/views/posts/IndexPost.vue'
import AddPost from '@/views/posts/AddPost.vue'
import EditPost from '@/views/posts/EditPost.vue'

import HomeView from '@/views/HomeView.vue'
import PostPage from '@/views/Post/IndexPost.vue'
import NotFound from '@/views/NotFoundView.vue'

import SearchView from '@/views/SearchView.vue'

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "post/:slug",
        name: "singlePost",
        component: PostPage,
      },
      {
        path: "search",
        name: "SearchView",
        component: SearchView,
      },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: "",
        component: AdminIndex,
      },
      {
        path: "users",
        component: UserIndex,
      },
      {
        path: "users/add",
        name: "addUser",
        component: AddUser,
      },
      {
        path: "users/edit/:id",
        name: "editUser",
        component: EditUser,
      },
      {
        path: "categories",
        component: IndexCategory,
      },
      {
        path: "categories/add",
        name: "addCategory",
        component: AddCategory,
      },
      {
        path: "categories/edit",
        name: "editCategory",
        component: EditCategory,
      },
      {
        path: "posts",
        name: "posts",
        component: IndexPost,
      },
      {
        path: "posts/add",
        name: "addPost",
        component: AddPost,
      },
      {
        path: "posts/edit/:id",
        name: "editPost",
        component: EditPost,
      },

    ]

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {path: '/:pathMatch(.*)*' , name: 'NotFound' , component: NotFound},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
