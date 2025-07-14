<!-- src/views/BookList.vue -->
<template>
    <div class="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-2xl font-semibold mb-6 text-blue-700">Danh sách sách</h1>
  
      <!-- Search Bar -->
      <div class="flex mb-8">
        <input
          v-model="search"
          type="text"
          placeholder="Tìm sách theo tiêu đề hoặc tác giả..."
          class="flex-1 border rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="fetchBooks"
          class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
        >
          Tìm kiếm
        </button>
      </div>
  
      <!-- Grid sách -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <BookCard
          v-for="book in books"
          :key="book.id"
          :book="book"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import BookCard from '../components/BookCard.vue'
  import axios from 'axios'
  
  const books = ref([])
  // const search = ref('')
  

  const fetchBooks = async () => {
    try{
      const res = await axios.get('http://localhost:5000/api/books')
      books.value = res.data
    } catch (err) {
      console.err('Lỗi khi tải sách', err)
    }
  }


onMounted(() => {
  fetchBooks()
})
  
  // const filteredBooks = computed(() => {
  //   if (!search.value) return books.value
  //   const q = search.value.toLowerCase()
  //   return books.value.filter(b =>
  //     b.tensach.toLowerCase().includes(q) ||
  //     b.tacgia.toLowerCase().includes(q)
  //   )
  // })
  </script>
  