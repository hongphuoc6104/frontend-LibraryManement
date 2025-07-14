<!-- trang này chưa hoàn thành -->

<template>
    <div class="max-w-6xl mx-auto px-4 py-6">
      <h1 class="text-2xl font-bold text-blue-700 mb-4">Thể loại: {{ genreName }}</h1>
  
      <div v-if="filteredBooks.length === 0" class="text-gray-500 italic">
        Không có sách nào thuộc thể loại này.
      </div>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <BookCard v-for="book in filteredBooks" :key="book.masach" :book="book" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import BookCard from '../components/BookCard.vue'
  
  //  Lấy slug từ URL
  const route = useRoute()
  const genreSlug = route.params.slug
  
  //  Mapping tên dễ đọc
  const genreMap = {
    'van-hoc': 'Văn học',
    'khoa-hoc': 'Khoa học',
    'tam-ly': 'Tâm lý',
    'ky-nang': 'Kỹ năng sống'
  }
  const genreName = genreMap[genreSlug] || 'Thể loại chưa xác định'
  
  //  Dữ liệu demo – sau này thay bằng dữ liệu thật từ API/backend
  const allBooks = [
    { masach: 'B001', tensach: 'Tam Thể', tacgia: 'Lưu Từ Hân', theloai: 'khoa-hoc' },
    { masach: 'B001', tensach: 'Tam Thể', tacgia: 'Lưu Từ Hân', theloai: 'khoa-hoc' },
    { masach: 'B002', tensach: 'Đắc Nhân Tâm', tacgia: 'Dale Carnegie', theloai: 'tam-ly' },
    { masach: 'B002', tensach: 'Đắc Nhân Tâm', tacgia: 'Dale Carnegie', theloai: 'tam-ly' },
    { masach: 'B003', tensach: 'Tuổi trẻ đáng giá bao nhiêu?', tacgia: 'Rosie Nguyễn', theloai: 'ky-nang' },
    { masach: 'B003', tensach: 'Tuổi trẻ đáng giá bao nhiêu?', tacgia: 'Rosie Nguyễn', theloai: 'ky-nang' },
    { masach: 'B004', tensach: 'Những người khốn khổ', tacgia: 'Victor Hugo', theloai: 'van-hoc' },
    { masach: 'B004', tensach: 'Những người khốn khổ', tacgia: 'Victor Hugo', theloai: 'van-hoc' },
  ]
  
  //  Lọc sách theo thể loại (slug)
  const filteredBooks = allBooks.filter(book => book.theloai === genreSlug)
  </script>
  