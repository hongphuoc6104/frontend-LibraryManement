<template>
  <div class="p-4 md:p-8">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Quản lý Người dùng</h1>

    <div class="border-b border-gray-200 mb-6">
      <nav class="flex space-x-4">
        <button 
          @click="activeTab = 'users'" 
          :class="['py-2 px-4 font-semibold rounded-t-lg', activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200']">
          👥 Quản lý Độc giả
        </button>
        <button 
          @click="activeTab = 'staff'" 
          :class="['py-2 px-4 font-semibold rounded-t-lg', activeTab === 'staff' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200']">
          👨‍💼 Quản lý Nhân viên (Admin)
        </button>
      </nav>
    </div>

    <div v-if="activeTab === 'users'">
      <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="p-4">Họ và Tên</th>
              <th class="p-4">Điện thoại</th>
              <th class="p-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id" class="border-b hover:bg-gray-50">
              <td class="p-4">{{ user.hoLot }} {{ user.ten }}</td>
              <td class="p-4">{{ user.dienThoai }}</td>
              <td class="p-4">
                <button @click="deleteUser(user._id, `${user.hoLot} ${user.ten}`)" class="p-1 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" title="Xóa">
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

    <div v-if="activeTab === 'staff'">
      <div class="flex justify-end mb-4">
        <button @click="openStaffModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          + Thêm Admin mới
        </button>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="border-b bg-gray-50">
              <th class="p-4">Họ và Tên</th>
              <th class="p-4">Chức vụ</th>
              <th class="p-4">Điện thoại</th>
              <th class="p-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in staff" :key="person._id" class="border-b hover:bg-gray-50">
              <td class="p-4">{{ person.hoTenNV }}</td>
              <td class="p-4">{{ person.chucVu }}</td>
              <td class="p-4">{{ person.soDienThoai }}</td>
              <td class="p-4 space-x-2 flex items-center">
                 <button @click="openStaffModal(person)" class="p-1 text-yellow-500 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition" title="Sửa">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
                    </svg>
                 </button>
                <button 
                    v-if="userStore.userId && person._id && userStore.userId !== person._id" 
                    @click="deleteStaff(person._id, person.hoTenNV)" 
                    class="p-1 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" 
                    title="Xóa"
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

    <div v-if="showStaffModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-6">{{ editingStaff ? 'Chỉnh sửa Nhân viên' : 'Thêm Admin mới' }}</h2>
        <form @submit.prevent="saveStaff">
          <div class="space-y-4">
            <div>
              <label class="block mb-1 font-medium">Họ tên nhân viên</label>
              <input v-model="staffForm.hoTenNV" type="text" required class="w-full p-2 border rounded"/>
            </div>
             <div>
              <label class="block mb-1 font-medium">Chức vụ</label>
              <input v-model="staffForm.chucVu" type="text" required class="w-full p-2 border rounded"/>
            </div>
            <div v-if="!editingStaff">
              <label class="block mb-1 font-medium">Email</label>
              <input v-model="staffForm.email" type="email" :required="!editingStaff" class="w-full p-2 border rounded"/>
            </div>
             <div v-if="!editingStaff">
              <label class="block mb-1 font-medium">Mật khẩu</label>
              <input v-model="staffForm.password" type="password" :required="!editingStaff" class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label class="block mb-1 font-medium">Địa chỉ</label>
              <input v-model="staffForm.diaChi" type="text" class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label class="block mb-1 font-medium">Số điện thoại</label>
              <input v-model="staffForm.soDienThoai" type="text" class="w-full p-2 border rounded"/>
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-4">
            <button @click="showStaffModal = false" type="button" class="bg-gray-200 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300">Hủy</button>
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
import { useUserStore } from '../../stores/userStore'

const userStore = useUserStore();
// --- STATE MANAGEMENT ---
const activeTab = ref('users');
const users = ref([]);
const staff = ref([]);

const showStaffModal = ref(false);
const editingStaff = ref(null);
const staffForm = ref({
  hoTenNV: '',
  chucVu: '',
  email: '',
  password: '',
  diaChi: '',
  soDienThoai: ''
});

const apiClient = axios.create({ baseURL: 'http://localhost:5000/api' });

// --- DATA FETCHING ---
async function fetchData() {
  try {
    const [usersRes, staffRes] = await Promise.all([
      apiClient.get('/users'),
      apiClient.get('/staff')
    ]);
    console.log('Kiểm tra userStore:', userStore);
    users.value = usersRes.data;
    staff.value = staffRes.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu người dùng:", error);
    alert("Không thể tải dữ liệu người dùng.");
  }
}

onMounted(fetchData);

// --- USER LOGIC ---
async function deleteUser(userId, userName) {
  if (!window.confirm(`Bạn có chắc muốn xóa độc giả "${userName}" không? Hành động này sẽ xóa cả tài khoản đăng nhập.`)) return;
  try {
    await apiClient.delete(`/users/${userId}`);
    await fetchData();
    alert('Xóa độc giả thành công!');
  } catch (error) {
    alert(error.response?.data?.message || 'Xóa độc giả thất bại.');
  }
}

// --- STAFF/ADMIN LOGIC ---
function openStaffModal(person = null) {
  if (person) {
    editingStaff.value = person;
    staffForm.value = { ...person };
  } else {
    editingStaff.value = null;
    staffForm.value = { hoTenNV: '', chucVu: '', email: '', password: '', diaChi: '', soDienThoai: '' };
  }
  showStaffModal.value = true;
}

async function saveStaff() {
  try {
    if (editingStaff.value) {
      await apiClient.put(`/staff/${editingStaff.value._id}`, staffForm.value);
    } else {
      await apiClient.post('/staff/admin', staffForm.value);
    }
    showStaffModal.value = false;
    await fetchData();
    alert('Lưu thông tin nhân viên thành công!');
  } catch (error) {
    alert(error.response?.data?.message || 'Lưu thông tin thất bại.');
  }
}

async function deleteStaff(staffId, staffName) {
  if (!window.confirm(`Bạn có chắc muốn xóa nhân viên "${staffName}" không? Hành động này sẽ xóa cả tài khoản admin.`)) return;
  try {
    await apiClient.delete(`/staff/${staffId}`);
    await fetchData();
    alert('Xóa nhân viên thành công!');
  } catch (error) {
    alert(error.response?.data?.message || 'Xóa nhân viên thất bại.');
  }
}

</script>
