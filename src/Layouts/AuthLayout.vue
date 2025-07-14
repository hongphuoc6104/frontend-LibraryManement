<!-- src/Layouts/AuthLayout.vue -->
<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white shadow-lg rounded">
        <!-- Tiêu đề chung hoặc logo -->

            <div class="mb-6 text-center">
              <router-link to="/" class="font-bold text-2xl tracking-wide text-blue-600 hover:text-blue-200 transition">
               THƯ VIỆN TRỰC TUYẾN
              </router-link>
            </div>

        <!-- Nội dung trang con -->
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
    // Không cần import gì nếu chỉ dùng router-view
  </script>
  