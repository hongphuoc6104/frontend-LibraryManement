<template>
  <div class="p-4 md:p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Quản lý Mượn/Trả sách</h1>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex-1">
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Tìm theo tên sách hoặc người mượn..." 
          class="w-full p-2 border rounded-lg"
        />
      </div>
      <div class="flex items-center gap-2">
        <button @click="filterStatus = 'Tất cả'" :class="getFilterClass('Tất cả')">Tất cả</button>
        <button @click="filterStatus = 'Đang mượn'" :class="getFilterClass('Đang mượn')">Đang mượn</button>
        <button @click="filterStatus = 'Quá hạn'" :class="getFilterClass('Quá hạn')">Quá hạn</button>
        <button @click="filterStatus = 'Đã trả'" :class="getFilterClass('Đã trả')">Đã trả</button>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b bg-gray-50">
            <th class="p-4">Tên sách</th>
            <th class="p-4">Người mượn</th>
            <th class="p-4">Ngày mượn</th>
            <th class="p-4">Ngày hẹn trả</th>
            <th class="p-4">Trạng thái</th>
            <th class="p-4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredBorrows" :key="item._id" class="border-b hover:bg-gray-50">
            <td class="p-4 font-medium">{{ item.bookId?.tenSach }}</td>
            <td class="p-4">{{ getBorrowerName(item.borrowerId) }}</td>
            <td class="p-4">{{ formatDate(item.ngayMuon) }}</td>
            <td class="p-4">{{ formatDate(item.ngayTra) }}</td>
            <td class="p-4">
              <span :class="getStatusClass(item)" class="px-2 py-1 text-xs font-semibold rounded-full">
                {{ getStatusText(item) }}
              </span>
            </td>
            <td class="p-4 space-x-2 flex items-center">
                <button 
                    v-if="item.status !== 'Đã trả'"
                    @click="markAsReturned(item._id)"
                    class="p-1 text-green-500 rounded-full hover:bg-green-100 hover:text-green-700 transition"
                    title="Đánh dấu đã trả"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                
                <button
                    @click="deleteBorrow(item._id)"
                    class="p-1 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition"
                    title="Xóa phiếu mượn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const borrows = ref([]);
const searchTerm = ref('');
const filterStatus = ref('Tất cả');

const apiClient = axios.create({ baseURL: 'http://localhost:5000/api' });

async function fetchData() {
  try {
    const res = await apiClient.get('/borrows');
    borrows.value = res.data;
  } catch (error) {
    console.error("Lỗi khi tải lịch sử mượn:", error);
  }
}

onMounted(fetchData);

const filteredBorrows = computed(() => {
  let filtered = borrows.value;

  // Filter by status
  if (filterStatus.value !== 'Tất cả') {
    if (filterStatus.value === 'Quá hạn') {
      filtered = filtered.filter(b => b.status === 'Đang mượn' && new Date(b.ngayTra) < new Date());
    } else {
      filtered = filtered.filter(b => b.status === filterStatus.value);
    }
  }

  // Filter by search term
  if (searchTerm.value) {
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    filtered = filtered.filter(b => 
      b.bookId?.tenSach.toLowerCase().includes(lowerCaseSearch) ||
      getBorrowerName(b.borrowerId).toLowerCase().includes(lowerCaseSearch)
    );
  }

  return filtered;
});

async function deleteBorrow(borrowId) {
  if (!window.confirm("Bạn có chắc chắn muốn XÓA VĨNH VIỄN phiếu mượn này không? Hành động này không thể hoàn tác.")) return;
  try {
    await apiClient.delete(`/borrows/${borrowId}`);
    await fetchData(); // Tải lại dữ liệu
    alert("Xóa phiếu mượn thành công!");
  } catch (error) {
    alert("Xóa thất bại.");
  }
}

async function markAsReturned(borrowId) {
  if (!window.confirm("Bạn có chắc chắn muốn đánh dấu phiếu mượn này là đã trả không?")) return;
  try {
    await apiClient.patch(`/borrows/return/${borrowId}`);
    await fetchData(); // Refresh data
    alert("Cập nhật thành công!");
  } catch (error) {
    alert("Cập nhật thất bại.");
  }
}

// --- Helper Functions ---
function getBorrowerName(borrower) {
  if (!borrower) return 'Không rõ';
  return borrower.hoTenNV || `${borrower.hoLot} ${borrower.ten}`;
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('vi-VN');
}

function getStatusText(item) {
  if (item.status === 'Đã trả') return 'Đã trả';
  if (new Date(item.ngayTra) < new Date()) return 'Quá hạn';
  return 'Đang mượn';
}

function getStatusClass(item) {
  const status = getStatusText(item);
  if (status === 'Đã trả') return 'bg-green-100 text-green-800';
  if (status === 'Quá hạn') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
}

function getFilterClass(status) {
  return [
    'px-3 py-1 rounded-lg text-sm',
    filterStatus.value === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
  ];
}
</script>