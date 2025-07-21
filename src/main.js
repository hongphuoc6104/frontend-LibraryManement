import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/style.css' // Sửa lại đường dẫn cho đúng
import App from './App.vue'

import router from '../router'
import { useUserStore } from './stores/userStore' // 👈 Thêm import này

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) // 👈 Luôn use(pinia) trước khi dùng store

// 👇 THÊM ĐOẠN CODE QUAN TRỌNG NÀY VÀO
// Đoạn code này sẽ chạy một lần duy nhất khi ứng dụng khởi động
const userStore = useUserStore()
userStore.initFromStorage()

app.use(router)

app.mount('#app')