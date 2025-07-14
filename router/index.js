import { createRouter, createWebHistory } from "vue-router";

// import duong dan trang web 
import Home from "../src/Views/Home.vue";
import NotFound from "../src/Views/NotFound.vue";
import Register from "../src/Views/Register.vue";
import Login from "../src/Views/Login.vue";
import GenreBookList from "../src/Views/GenreBookList.vue";
import BookList from "../src/Views/BookList.vue"
import BookDetail from "../src/Views/BookDetail.vue";
import BorrowedBooks from "../src/Views/BorrowedBooks.vue";


import MainLayout from "../src/Layouts/MainLayout.vue";
import AuthLayout from "../src/Layouts/AuthLayout.vue";

const routes = [
    {
        path: '/',
        component: MainLayout,
        children:[
            {path:'', component: Home, name: 'Home' },
            {path: '/genres/:slug', component: GenreBookList, name: 'GenreBooks'},
            { path: 'books',      component: BookList,      name: 'BookList' , meta: { requiresAuth: true }},
            { path: 'books/masach/:maSach',  component: BookDetail,    name: 'BookDetail', meta: { requiresAuth: true } },
            {
                path: 'borrowed',
                component: BorrowedBooks,
                name: 'BorrowedBooks',
                meta: { requiresAuth: true }
              }
    ],
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {path: 'login', component: Login, name: 'Login'},
            {path: 'register', component: Register, name: 'Register'}
        ]
    },
    {
        path: '/:catchAll(.*)',
        component: NotFound,
        name: 'NotFound'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')  // hoặc từ store/auth
    if (to.meta.requiresAuth && !isLoggedIn) {
      return next({ name: 'Login' })
    }
    next()
  })

export default router