<template>
  <div class="border p-4 rounded shadow hover:shadow-md transition flex flex-col min-h-[400px]">
    <!-- Ảnh bìa sách -->
    <img
      :src="book.hinhAnh || defaultImg"
      alt="Bìa sách"
      class="w-full h-48 object-cover mb-2 rounded-md"
    />

    <h3 class="font-bold text-lg text-blue-700 mb-1 line-clamp-2">
      {{ book.tenSach }}
    </h3>

    <p class="text-sm text-gray-700">Tác giả: {{ book.tacGia }}</p>
    <p class="text-sm text-gray-600">
      Giá: {{ book.donGia ? book.donGia.toLocaleString() + '₫' : 'Chưa cập nhật' }}
    </p>
    <p class="text-xs text-gray-500 mt-2">
      NXB: {{ book.maNXB?.tenNXB || 'Chưa rõ' }}
    </p>

    <router-link
      :to="`/books/masach/${book.maSach}`"
      class="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm text-center"
    >
      🔍 Xem chi tiết
    </router-link>
  </div>
</template>

  <script setup>
  const defaultImg = 'https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
  defineProps({
    book: Object
  })
  </script>
  