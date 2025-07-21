<template>
  <div class="p-4 md:p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Quản lý Nội dung</h1>

    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-4">
        <button 
          @click="activeTab = 'books'" 
          :class="['py-2 px-4 font-semibold rounded-t-lg', activeTab === 'books' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200']">
          📚 Quản lý Sách
        </button>
        <button 
          @click="activeTab = 'publishers'" 
          :class="['py-2 px-4 font-semibold rounded-t-lg', activeTab === 'publishers' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200']">
          🏢 Quản lý Nhà xuất bản
        </button>
      </nav>
    </div>

    <div v-if="activeTab === 'books'">
      <div class="flex justify-end mb-4">
        <button @click="openBookModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          + Thêm sách mới
        </button>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="p-4">Tên sách</th>
              <th class="p-4">Tác giả</th>
              <th class="p-4">Số lượng</th>
              <th class="p-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book._id" class="border-b hover:bg-gray-50">
              <td class="p-4">{{ book.tenSach }}</td>
              <td class="p-4">{{ book.tacGia }}</td>
              <td class="p-4">{{ book.soQuyen }}</td>
              <td class="p-4 space-x-2 flex items-center">
                <button @click="openBookModal(book)" class="p-1 text-yellow-500 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition" title="Sửa">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                    </svg>
                </button>
                    
                <button @click="deleteBook(book._id, book.tenSach)" class="p-1 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" title="Xóa">
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

    <div v-if="activeTab === 'publishers'">
      <div class="flex justify-end mb-4">
        <button @click="openPublisherModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          + Thêm NXB mới
        </button>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="p-4">Tên Nhà xuất bản</th>
              <th class="p-4">Địa chỉ</th>
              <th class="p-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pub in publishers" :key="pub._id" class="border-b hover:bg-gray-50">
              <td class="p-4">{{ pub.tenNXB }}</td>
              <td class="p-4">{{ pub.diaChi }}</td>
              <td class="p-4 space-x-2 flex items-center">
                <button @click="openPublisherModal(pub)" class="p-1 text-yellow-500 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition" title="Sửa">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                  </svg>
                </button>
                <button @click="deletePublisher(pub._id, pub.tenNXB)" class="p-1 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" title="Xóa">
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

    <div v-if="showBookModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-6">{{ editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới' }}</h2>
        <form @submit.prevent="saveBook">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Tên sách</label>
              <input v-model="bookForm.tenSach" type="text" required class="w-full p-2 border rounded"/>
            </div>
            
            <div>
              <label class="block mb-1 font-medium">Mã sách</label>
              <input v-model.number="bookForm.maSach" type="number" required class="w-full p-2 border rounded"/>
            </div>
            
            <div>
              <label class="block mb-1 font-medium">Tác giả</label>
              <input v-model="bookForm.tacGia" type="text" required class="w-full p-2 border rounded"/>
            </div>

            <div>
              <label class="block mb-1 font-medium">Số lượng</label>
              <input v-model.number="bookForm.soQuyen" type="number" required min="0" class="w-full p-2 border rounded"/>
            </div>

            <div>
              <label class="block mb-1 font-medium">Đơn giá</label>
              <input v-model.number="bookForm.donGia" type="number" required min="0" class="w-full p-2 border rounded"/>
            </div>
            
            <div>
                <label class="block mb-1 font-medium">Năm xuất bản</label>
                <input v-model.number="bookForm.namXuatBan" type="number" placeholder="YYYY" class="w-full p-2 border rounded"/>
            </div>

            <div>
              <label class="block mb-1 font-medium">Nhà xuất bản</label>
              <select v-model="bookForm.maNXB" required class="w-full p-2 border rounded bg-white">
                <option disabled value="">-- Chọn nhà xuất bản --</option>
                <option v-for="pub in publishers" :key="pub._id" :value="pub._id">
                  {{ pub.tenNXB }}
                </option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label class="block mb-1 font-medium">Link hình ảnh</label>
              <input v-model="bookForm.hinhAnh" type="url" placeholder="https://example.com/image.jpg" class="w-full p-2 border rounded"/>
            </div>

          </div>

          <div class="mt-8 flex justify-end space-x-4">
            <button @click="showBookModal = false" type="button" class="bg-gray-200 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300">Hủy</button>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showPublisherModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-6">{{ editingPublisher ? 'Chỉnh sửa NXB' : 'Thêm NXB mới' }}</h2>
        <form @submit.prevent="savePublisher">
          <div class="space-y-4">

            <div>
              <label class="block mb-1 font-medium">Mã Nhà xuất bản</label>
              <input v-model.number="publisherForm.maNXB" type="number" required class="w-full p-2 border rounded"/>
            </div>

            <div>
              <label class="block mb-1 font-medium">Tên Nhà xuất bản</label>
              <input v-model="publisherForm.tenNXB" type="text" required class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label class="block mb-1 font-medium">Địa chỉ</label>
              <input v-model="publisherForm.diaChi" type="text" class="w-full p-2 border rounded"/>
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-4">
            <button @click="showPublisherModal = false" type="button" class="bg-gray-200 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300">Hủy</button>
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// --- STATE MANAGEMENT ---
const activeTab = ref('books');
const books = ref([]);
const publishers = ref([]);

const showBookModal = ref(false);
const editingBook = ref(null); // null for new, book object for editing
const bookForm = ref({
  maSach: null,
  tenSach: '',
  tacGia: '',
  soQuyen: 1,
  maNXB: '',
  hinhAnh: '',
  donGia: 0,
  namXuatBan: null
  // Add other fields from your Book model here
});


// Quản lý modal và form của NXB
const showPublisherModal = ref(false);
const editingPublisher = ref(null);
const publisherForm = ref({
  maNXB: null,
  tenNXB: '',
  diaChi: ''
});

const apiClient = axios.create({ baseURL: 'http://localhost:5000/api' });

// --- DATA FETCHING ---
async function fetchData() {
  try {
    const [booksRes, publishersRes] = await Promise.all([
      apiClient.get('/books'),
      apiClient.get('/publishers')
    ]);
    books.value = booksRes.data;
    publishers.value = publishersRes.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    alert("Không thể tải dữ liệu từ máy chủ.");
  }
}

onMounted(fetchData);

// --- BOOK MODAL LOGIC ---
function openBookModal(book = null) {
  if (book) {
    // Editing existing book
    editingBook.value = book;
    bookForm.value = { ...book, maNXB: book.maNXB?._id || book.maNXB };
  } else {
    // Adding new book
    editingBook.value = null;
    bookForm.value = { maSach: null, tenSach: '', tacGia: '', soQuyen: 1, maNXB: '', hinhAnh: '', donGia: 0, namXuatBan: null }; // 👈 Thêm vào
  }
  showBookModal.value = true;
}

async function saveBook() {
  try {
    if (editingBook.value) {
      // Update book
      await apiClient.put(`/books/${editingBook.value._id}`, bookForm.value);
    } else {
      // Create new book
      await apiClient.post('/books', bookForm.value);
    }
    showBookModal.value = false;
    await fetchData(); // Refresh data
    alert('Lưu sách thành công!');
  } catch (error) {
    console.error("Lỗi khi lưu sách:", error);
    alert(error.response?.data?.message || 'Lưu sách thất bại.');
  }
}

// --- DELETE BOOK LOGIC ---
async function deleteBook(bookId, bookTitle) {
  if (!window.confirm(`Bạn có chắc chắn muốn xóa sách "${bookTitle}" không?`)) {
    return;
  }
  try {
    await apiClient.delete(`/books/${bookId}`);
    await fetchData(); // Refresh data
    alert('Xóa sách thành công!');
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    alert(error.response?.data?.message || 'Xóa sách thất bại.');
  }
}



// --- PUBLISHER MODAL LOGIC ---
function openPublisherModal(publisher = null) {
  if (publisher) {
    // Chỉnh sửa NXB đã có
    editingPublisher.value = publisher;
    publisherForm.value = { ...publisher };
  } else {
    // Thêm NXB mới
    editingPublisher.value = null;
    publisherForm.value = { maNXB: null, tenNXB: '', diaChi: '' };
  }
  showPublisherModal.value = true;
}

async function savePublisher() {
  try {
    if (editingPublisher.value) {
      // Cập nhật NXB
      await apiClient.put(`/publishers/${editingPublisher.value._id}`, publisherForm.value);
    } else {
      // Tạo NXB mới
      await apiClient.post('/publishers', publisherForm.value);
    }
    showPublisherModal.value = false;
    await fetchData(); // Tải lại danh sách sách và NXB
    alert('Lưu nhà xuất bản thành công!');
  } catch (error) {
    console.error("Lỗi khi lưu nhà xuất bản:", error);
    alert(error.response?.data?.message || 'Lưu nhà xuất bản thất bại.');
  }
}

// --- DELETE PUBLISHER LOGIC ---
async function deletePublisher(publisherId, publisherName) {
  if (!window.confirm(`Bạn có chắc chắn muốn xóa nhà xuất bản "${publisherName}" không?`)) {
    return;
  }
  try {
    await apiClient.delete(`/publishers/${publisherId}`);
    await fetchData(); // Tải lại danh sách sách và NXB
    alert('Xóa nhà xuất bản thành công!');
  } catch (error) {
    console.error("Lỗi khi xóa nhà xuất bản:", error);
    alert(error.response?.data?.message || 'Xóa nhà xuất bản thất bại.');
  }
}



</script>