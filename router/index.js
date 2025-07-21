import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../src/stores/userStore"; 

// import duong dan trang web 
import Home from "../src/Views/Home.vue";
import NotFound from "../src/Views/NotFound.vue";
import Register from "../src/Views/Register.vue";
import Login from "../src/Views/Login.vue";

// import GenreBookList from "../src/Views/GenreBookList.vue";

import BookList from "../src/Views/BookList.vue"
import BookDetail from "../src/Views/BookDetail.vue";
import BorrowedBooks from "../src/Views/BorrowedBooks.vue";

import Dashboard from "../src/Views/Admin/Dashboard.vue";
import ManageContent from "../src/Views/Admin/ManageContent.vue"
import ManageUsers from "../src/Views/Admin/ManageUsers.vue"
import ManageBorrow from "../src/Views/Admin/ManageBorrow.vue"

import MainLayout from "../src/Layouts/MainLayout.vue";
import AuthLayout from "../src/Layouts/AuthLayout.vue";
import AdminLayout from "../src/Layouts/AdminLayout.vue";



const routes = [
    {
        path: '/',
        component: MainLayout,
        children:[
            { path: '', component: Home, name: 'Home' },
            // 👇 Sửa lại: Bỏ dấu / ở đầu
            // { path: 'genres/:slug', component: GenreBookList, name: 'GenreBooks' },
            { path: 'books', component: BookList, name: 'BookList' , meta: { requiresAuth: true }},
            { path: 'books/masach/:maSach', component: BookDetail, name: 'BookDetail', meta: { requiresAuth: true } },
            { path: 'borrowed', component: BorrowedBooks, name: 'BorrowedBooks', meta: { requiresAuth: true } }
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
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresAdmin: true }, // Thêm meta để kiểm tra quyền admin
        children: [
            {
                // Redirect /admin về trang dashboard
                path: '',
                redirect: '/admin/dashboard',
            },
            {
                path: 'dashboard',
                name: 'AdminDashboard',
                component: Dashboard,
            },
            {
            path: 'manage-content',
            name: 'AdminManageContent',
            component: ManageContent,
            },
            {
            path: 'manage-users',
            name: 'AdminManageUsers',
            component: ManageUsers,
            },
            {
                path: 'manage-borrow',
                name: 'AdminManageBorrow',
                component: ManageBorrow,
            }
            // {
            //     path: 'manage-books',
            //     name: 'AdminManageBooks',
            //     component: ManageBooks,
            // },
            // ... các route quản lý khác sẽ thêm vào đây
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
    scrollBehavior(to, from, savedPosition) {
        // Luôn cuộn lên đầu trang khi điều hướng
        return { top: 0 }
    },    
    routes,
})

// file: router/index.js

router.beforeEach((to, from, next) => {
    // Đọc trực tiếp từ localStorage để kiểm tra nhanh và chính xác nhất
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // 1. Kiểm tra route yêu cầu đăng nhập
    if (to.meta.requiresAuth && !token) {
        // Nếu yêu cầu đăng nhập mà không có token -> về trang Login
        return next({ name: 'Login' });
    }

    // 2. Kiểm tra route yêu cầu quyền admin
    if (to.meta.requiresAdmin && role !== 'admin') {
        // Nếu yêu cầu quyền admin mà role không phải 'admin' -> cảnh báo và về trang Home
        alert('Bạn không có quyền truy cập vào trang này!');
        return next({ name: 'Home' }); 
    }

    // Nếu tất cả điều kiện đều qua, cho phép truy cập
    next();
});

export default router