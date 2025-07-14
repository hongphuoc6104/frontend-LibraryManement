<!-- src/views/Login.vue -->
<template>
  <form @submit.prevent="handleLogin " class="space-y-6">
    <h2 class="text-2xl font-bold text-center text-gray-800">
      Đăng nhập
    </h2>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email đăng nhập
      </label>
      <input
        id="email"
        v-model="email"
        type="email"
        autocomplete="email"
        value=""
        class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">
        Mật khẩu
      </label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="current-password"
        value=""
        class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
    >
      Đăng nhập
    </button>
    <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
    <p class="text-center text-sm text-gray-600">
      Chưa có tài khoản?   
      <router-link to="/auth/register" class="text-blue-500 hover:underline">
        Đăng ký
      </router-link>
    </p>
  </form>
  
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from "../stores/userStore"

const userStore = useUserStore()
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''

  try {
    const res = await axios.post('http://localhost:5000/api/account/login', {
      email: email.value,
      password: password.value
    })

    const { token, role, userInfo } = res.data
    const username = userInfo.hoTenNV || userInfo.fullName || 'Người dùng'
    const userId   = userInfo.userId

    userStore.login({
      token,
      username,
      userId,
      role,
      avatarUrl: ''  // bạn có thể gắn avatar sau nếu muốn
    })

    alert(`Xin chào ${username}`)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Đăng nhập thất bại, sai tài khoản hoặc mật khẩu'
  }
}

</script>