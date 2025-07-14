<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-6 text-blue-700">📚 Danh sách sách đã mượn</h1>

    <div v-if="borrows.length === 0" class="text-gray-500 italic text-center">
      Bạn chưa mượn cuốn nào.
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <li
        v-for="item in borrows"
        :key="item._id"
        class="border rounded-lg shadow-sm p-4 bg-white flex gap-4 hover:shadow-md transition"
      >
        <img
          :src="item.bookId?.hinhAnh || defaultImg"
          alt="Bìa sách"
          class="w-28 h-36 object-cover rounded"
        />

        <div class="flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-lg font-bold text-blue-700">{{ item.bookId.tenSach }}</h3>
            <p class="text-sm text-gray-600">Mã sách: {{ item.bookId.maSach }}</p>
            <p class="text-sm text-gray-600">Tác giả: {{ item.bookId.tacGia }}</p>
            <p class="text-sm text-gray-600">Ngày mượn: {{ formatDate(item.ngayMuon) }}</p>
            <p v-if="item.ngayTra" class="text-sm text-gray-600">Ngày trả: {{ formatDate(item.ngayTra) }}</p>
          </div>

          <div class="mt-2">
            <span v-if="getHạnStatus(item.ngayTra) === ' Quá hạn trả'" class="text-xm text-red-600 italic">{{ getHạnStatus(item.ngayTra) }}</span>
            <span v-else-if="getHạnStatus(item.ngayTra) === ` Sắp hết hạn (${diffDays} ngày)`" class="text-xm text-yellow-500 italic">{{ getHạnStatus(item.ngayTra) }}</span>
            <span v-else="getHạnStatus(item.ngayTra) === ` Còn ${diffDays} ngày`" class="text-xm text-gray-400 italic">{{ getHạnStatus(item.ngayTra) }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const defaultImg = 'https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
const borrows = ref([])
const userId = localStorage.getItem('userId')

async function fetchBorrows() {
  try {
    const res = await axios.get(`http://localhost:5000/api/borrows/me/${userId}`)
    borrows.value = res.data
  } catch (err) {
    console.error('Lỗi khi lấy lịch sử mượn:', err)
  }
}

onMounted(fetchBorrows)

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function getHạnStatus(ngayTra) {
  if (!ngayTra) return ' Chưa có hạn trả'
  const today = new Date()
  const traDate = new Date(ngayTra)
  const diffDays = Math.ceil((traDate - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return ' Quá hạn trả'
  if (diffDays <= 3) return ` Sắp hết hạn (${diffDays} ngày)`
  return ` Còn ${diffDays} ngày`
}
</script>
