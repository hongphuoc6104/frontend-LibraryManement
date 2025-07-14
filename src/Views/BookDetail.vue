<!-- src/views/BookDetail.vue -->
<template>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <button @click="$router.back()" class="text-blue-600 hover:underline mb-6">← Quay lại</button>

    <div class="flex flex-col md:flex-row gap-8 bg-white border p-6 rounded shadow">
      <!-- Ảnh bìa sách -->
      <div class="flex-shrink-0">
        <img
          :src="book.hinhAnh || defaultImg"
          alt="Ảnh bìa"
          class="w-64 h-96 object-cover rounded shadow-md"
        />
      </div>

      <!-- Thông tin chi tiết -->
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold text-blue-700 mb-2">{{ book.tenSach }}</h1>
          <p class="text-gray-700 text-sm">Mã sách: {{ book.maSach }}</p>
          <p class="text-gray-700 mt-1">Tác giả: <span class="font-medium">{{ book.tacGia }}</span></p>
          <p class="text-gray-700 mt-1">
            NXB: {{ book.maNXB?.tenNXB || 'Chưa rõ' }} ({{ book.namXuatBan }})
          </p>
          <p class="text-lg text-green-600 mt-2 font-semibold">
            Giá: {{ book.donGia?.toLocaleString() }}₫
          </p>
          <p class="text-gray-600 mt-4 text-sm">Số quyển còn: {{ book.soQuyen }}</p>
        </div>

        <button
          @click="borrowBook"
          class="mt-6 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition w-full"
        >
           Yêu cầu mượn sách
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const defaultImg =
  'https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'

const route = useRoute()
const book = ref({})

onMounted(async () => {
  const maSach = route.params.maSach
  try {
    const res = await axios.get(`http://localhost:5000/api/books/masach/${maSach}`)
    book.value = res.data
  } catch (err) {
    console.error('Lỗi khi lấy chi tiết sách:', err)
  }
})

async function borrowBook() {
  const userId = localStorage.getItem('userId') // hoặc lấy từ userStore nếu bạn dùng Pinia
  const bookId = book.value._id                 // backend cần _id thật của sách


  console.log(bookId)
  console.log(userId)
  // Ngày mượn = hiện tại, ngày trả = cộng thêm 7 ngày
  const ngayMuon = new Date()
  const ngayTra = new Date()
  ngayTra.setDate(ngayTra.getDate() + 7)

  try {
    await axios.post('http://localhost:5000/api/borrows', {
      userId,
      bookId,
      ngayMuon: ngayMuon.toISOString(),
      ngayTra: ngayTra.toISOString()
    })

    alert(` Yêu cầu mượn sách "${book.value.tenSach}" đã được gửi!\nHạn trả: ${ngayTra.toLocaleDateString()}`)
  } catch (err) {
    console.error(' Lỗi khi tạo phiếu mượn:', err)
    alert('Không thể gửi yêu cầu mượn sách. Vui lòng thử lại sau.')
  }
}

</script>
