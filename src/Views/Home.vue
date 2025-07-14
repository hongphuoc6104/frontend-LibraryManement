<!-- src/views/Home.vue -->
<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    
    <!-- 1. Header: Tiêu đề & Giới thiệu -->
    <div class="text-center mb-5">
      <h1 v-if="user.isLoggedIn" class="text-4xl font-bold text-blue-600">
        Chào mừng {{ user.username }} đến với thư viện trực tuyến
      </h1>
      <h1 v-else class="text-4xl font-bold text-blue-600">
        Chào mừng {{ user.username }} đến với thư viện trực tuyến
      </h1>
      <p class="mt-2 text-gray-600">
        Khám phá, đọc sách và phát triển tri thức mọi lúc mọi nơi.
      </p>
    </div>

    <!-- 2. Search bar + nút Tìm kiếm -->
    <div class="flex items-center justify-center mb-4">
      <input
        type="text"
        placeholder="Tìm kiếm sách..."
        class="w-full sm:w-1/2 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <button
        class="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
      >
        Tìm kiếm
      </button>
    </div>

    <!-- 3. Nút Khám phá nằm phía dưới -->
    <div class="flex justify-center mb-6">
      <router-link to="/books">
        <button
          class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Khám phá thư viện
        </button>
      </router-link>
    </div>

    <!-- 4. Danh sách Sách nổi bật -->
    <div>
      <h2 class="text-2xl font-semibold text-blue-800 mb-4">
        Sách nổi bật
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BookCard from '../components/BookCard.vue';
import { useUserStore } from '../stores/userStore';

const books = ref([])
const user = useUserStore()
const fetchBooks = async () => {
  try{
    const res = await axios.get('http://localhost:5000/api/books')
    books.value = res.data.slice(0, 4)
  } catch (err) {
    console.error('Lỗi khi tải sách', err)
  }
}

onMounted(() => {
  fetchBooks()
})

</script>
