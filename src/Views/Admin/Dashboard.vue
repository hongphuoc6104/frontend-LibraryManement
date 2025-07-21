<template>
  <div class="p-4 md:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Bảng điều khiển</h1>

    <div v-if="loading" class="text-center text-gray-500">Đang tải dữ liệu...</div>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
      <strong class="font-bold">Lỗi!</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <div v-if="!loading && !error">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div class="bg-blue-100 p-3 rounded-full mr-4">
            <span class="text-2xl">📚</span>
          </div>
          <div>
            <p class="text-sm text-gray-500">Tổng số đầu sách</p>
            <span class="text-2xl font-bold text-gray-800">{{ stats.totalBookTitles }}</span>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div class="bg-green-100 p-3 rounded-full mr-4">
            <span class="text-2xl">👥</span>
          </div>
          <div>
            <p class="text-sm text-gray-500">Tổng số độc giả</p>
            <span class="text-2xl font-bold text-gray-800">{{ stats.totalUsers }}</span>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
          <div class="bg-yellow-100 p-3 rounded-full mr-4">
            <span class="text-2xl">📖</span>
          </div>
          <div>
            <p class="text-sm text-gray-500">Sách đang mượn</p>
            <span class="text-2xl font-bold text-gray-800">{{ stats.currentlyBorrowed }}</span>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center">
           <div class="bg-red-100 p-3 rounded-full mr-4">
            <span class="text-2xl">⚠️</span>
          </div>
          <div>
            <p class="text-sm text-gray-500">Sách quá hạn trả</p>
            <span class="text-2xl font-bold text-gray-800">{{ stats.overdueBooks }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Danh sách sách quá hạn</h2>
          <div v-if="overdueList.length > 0" class="overflow-y-auto max-h-80">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                <tr>
                  <th scope="col" class="px-6 py-3">Tên sách</th>
                  <th scope="col" class="px-6 py-3">Người mượn</th>
                  <th scope="col" class="px-6 py-3">Ngày hẹn trả</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in overdueList" :key="item._id" class="bg-white border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-medium text-gray-900">{{ item.bookId?.tenSach }}</td>
                  <td class="px-6 py-4">{{ item.borrowerId ? (item.borrowerId.hoTenNV || `${item.borrowerId.hoLot} ${item.borrowerId.ten}`) : 'Không rõ' }}</td>
                  <td class="px-6 py-4 text-red-600 font-bold">{{ formatDate(item.ngayTra) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-gray-500">Không có sách nào bị quá hạn.</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Danh sách sách đã hết</h2>
          <div v-if="outOfStockBooks.length > 0" class="overflow-y-auto max-h-80">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                <tr>
                  <th scope="col" class="px-6 py-3">Tên sách</th>
                  <th scope="col" class="px-6 py-3">Tác giả</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in outOfStockBooks" :key="book._id" class="bg-white border-b hover:bg-gray-50">
                  <td class="px-6 py-4 font-medium text-gray-900">{{ book.tenSach }}</td>
                  <td class="px-6 py-4">{{ book.tacGia }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-8">
            <p class="text-gray-500"> Không có sách nào bị hết.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// --- STATE ---
const loading = ref(true);
const error = ref(null);
const stats = ref({
  totalBookTitles: 0,
  totalUsers: 0,
  currentlyBorrowed: 0,
  overdueBooks: 0,
});
const overdueList = ref([]);
const outOfStockBooks = ref([]); // 👈 State mới

// --- DATA FETCHING ---
async function fetchDashboardData() {
  loading.value = true;
  error.value = null;
  try {
    const [booksRes, usersRes, borrowsRes, outOfStockRes] = await Promise.all([
      apiClient.get('/books'),
      apiClient.get('/users'),
      apiClient.get('/borrows'),
      apiClient.get('/books/out-of-stock'), // 👈 Gọi API mới
    ]);

    stats.value.totalBookTitles = booksRes.data?.length || 0;
    stats.value.totalUsers = usersRes.data?.length || 0;
    outOfStockBooks.value = outOfStockRes.data; // 👈 Gán dữ liệu

    if (borrowsRes.data) {
      const allBorrows = borrowsRes.data;
      const now = new Date();
      
      const activeBorrows = allBorrows.filter(b => b.status === 'Đang mượn');
      stats.value.currentlyBorrowed = activeBorrows.length;

      overdueList.value = activeBorrows.filter(b => new Date(b.ngayTra) < now);
      stats.value.overdueBooks = overdueList.value.length;
    }

  } catch (err) {
    error.value = "Không thể tải dữ liệu từ máy chủ.";
    console.error("Lỗi khi tải dữ liệu cho dashboard:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchDashboardData);

// --- HELPER FUNCTIONS ---
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
}
</script>