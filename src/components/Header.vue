<script setup>
import {ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const user = useUserStore()
const router = useRouter()

// Trạng thái dropdown
const dropdownOpen = ref(false)
const dropdownRef = ref(null)

// Trạng thái dropdown
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Trạng thái dropdown
const handleLogout = () => {
  user.logout()
  dropdownOpen.value = false
  router.push('/auth/Login')
}

// Khởi tạo lại khi reload trang
onMounted(() => {
  user.initFromStorage?.()
})

const onClickOutside = (event) => {
  if(dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

</script>



<template>
  <header class="bg-blue-600 px-6 py-4 flex justify-between items-center shadow-md text-white">
    <!-- logo -->
    <router-link to="/" class="font-bold text-2xl tracking-wide hover:text-gray-200 transition">
      📘 THƯ VIỆN TRỰC TUYẾN
    </router-link>

    <!-- NAVIGATON -->
    <nav class="flex items-center gap-6 relative">
      <router-link to="/" class="hover:text-gray-300 transition">Trang chủ</router-link>
      <router-link to="/books" class="hover:text-gray-300 transition">Sách</router-link>

      <!-- kiểm tra đăng nhập -->
      <template v-if="user.isLoggedIn">
        <div class="relative" ref="dropdownRef">
          <button @click="toggleDropdown" class="flex items-center gap-2 hover:text-gray-300 transition">
            👤 {{ user.username }}
            <span class="text-sm">▼</span>
          </button>

          <!-- Dropdown menu -->
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-10 text-gray-700">
            <router-link to="/borrowed" class="block px-4 py-2 hover:bg-gray-100 transition">
              📚 Thông tin sách đã mượn
            </router-link>
            <button @click="handleLogout" class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition">
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <router-link to="/auth/login" class="hover:underline text-white hover:text-gray-300 transition">
           Đăng nhập
        </router-link>
      </template>
    </nav>
  </header>
</template>













<!-- <template>
  <header class="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"> -->
      <!-- Logo / Brand -->
      <!-- <router-link to="/" class="flex items-center space-x-2">
        <span class="text-2xl">📚</span>
        <span class="text-xl font-bold">Thư viện</span> -->
      <!-- </router-link> -->

      <!-- Desktop Nav -->
      <!-- <nav class="hidden md:flex space-x-6">
        <router-link
          to="/"
          class="hover:underline"
          :class="{ 'underline font-semibold': $route.name === 'Home' }"
        >
          Trang chủ
        </router-link>
        <router-link
          to="/books"
          class="hover:underline"
          :class="{ 'underline font-semibold': $route.name === 'BookList' }"
        >
          Sách
        </router-link>
        <router-link
          v-if="!isLoggedIn"
          to="/auth/login"
          class="hover:underline"
        >
          Đăng nhập
        </router-link>
        <button
          v-else
          @click="logout"
          class="hover:underline"
        >
          Đăng xuất
        </button>
      </nav>

      Mobile Hamburger
      <button
        @click="showMenu = !showMenu"
        aria-label="Menu"
        class="md:hidden focus:outline-none"
      >
        <svg
          v-if="!showMenu"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    Mobile Menu
     
    <nav
      v-if="showMenu"
      class="md:hidden bg-blue-700 px-4 pb-4 space-y-2"
    >
      <router-link
        to="/"
        class="block hover:underline"
        @click="showMenu = false"
      >
        Trang chủ
      </router-link>
      <router-link
        to="/books"
        class="block hover:underline"
        @click="showMenu = false"
      >
        Sách
      </router-link>
      <router-link
        v-if="!isLoggedIn"
        to="/auth/login"
        class="block hover:underline"
        @click="showMenu = false"
      >
        Đăng nhập
      </router-link>
      <button
        v-else
        @click="logout"
        class="block hover:underline text-left w-full"
      >
        Đăng xuất
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showMenu = ref(false)

Giả lập trạng thái đăng nhập
TODO: thay bằng store hoặc composable auth thật
const isLoggedIn = computed(() => !!localStorage.getItem('token'))

function logout() {
  localStorage.removeItem('token')
  router.push('/')
}
</script>
 -->






<!-- <template>
  <header class="bg-gray-100 px-4 py-2 flex justify-between items-center shadow">
    <router-link to="/" class="font-bold text-xl text-green-600">
      📘 Library Manager
    </router-link>

    <div class="flex items-center gap-4">
      <template v-if="isLoggedIn">
        <span class="text-gray-700">👋 {{ username }}</span>
        <router-link to="/borrowed" class="text-blue-600 hover:underline">
          📚 Tủ sách của tôi
        </router-link>
        <button @click="handleLogout" class="text-red-600 hover:underline">
          🚪 Đăng xuất
        </button>
      </template>

      <template v-else>
        <router-link to="/auth/login" class="text-blue-600 hover:underline">
          🔑 Đăng nhập
        </router-link>
      </template>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    isLoggedIn.value = true
    username.value = window.userName || 'Người dùng'
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  username.value = ''
  router.push('/auth/login')
}
</script> -->
