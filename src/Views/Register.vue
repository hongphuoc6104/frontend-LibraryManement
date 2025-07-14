<template>
<form @submit.prevent="handleRegister" class="max-w-6xl mx-auto space-y-2 px-6">
    <h2 class="text-2xl font-bold text-center text-gray-800"> Đăng ký</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 🧍 Thông tin cá nhân -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Họ lót</label>
          <input v-model="hoLot" type="text"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tên</label>
          <input v-model="ten" type="text"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Ngày sinh</label>
          <input v-model="ngaySinh" type="date"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Giới tính</label>
          <select v-model="phai"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">--Chọn giới tính--</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
          <input v-model="diaChi" type="text"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input v-model="dienThoai" type="tel"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <!-- 🔐 Thông tin tài khoản -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input v-model="email" type="email"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <input v-model="password" type="password"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
          <input v-model="confirm" type="password"
            class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>

    <button type="submit"
      class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
      Đăng ký 
    </button>

    <p v-if="message" class="text-center text-red-500 mt-2">{{ message }}</p>

    <p class="text-center text-sm text-gray-600 mt-4">
      Đã có tài khoản?
      <router-link to="/auth/login" class="text-blue-500 hover:underline">Đăng nhập</router-link>
    </p>
  </form>
  <!-- <router-link to="/">
    <button class="text-blue-600 hover:underline mb-6">← Quay lại trang chủ</button>
  </router-link> -->
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 🧍 Info cá nhân
const hoLot     = ref('')
const ten       = ref('')
const ngaySinh  = ref('')
const phai      = ref('')
const diaChi    = ref('')
const dienThoai = ref('')

// 🔐 Tài khoản
const email    = ref('')
const password = ref('')
const confirm  = ref('')
const message  = ref('')

const errorHoLot    = ref('')
const errorTen      = ref('')
const errorEmail    = ref('')
const errorPassword = ref('')
const errorConfirm  = ref('')

const router = useRouter()

const handleRegister = async () => {
  // Reset lỗi
  errorHoLot.value = ''
  errorTen.value = ''
  errorEmail.value = ''
  errorPassword.value = ''
  errorConfirm.value = ''
  message.value = ''

  let hasError = false

  if (!hoLot.value) {
    errorHoLot.value = 'Vui lòng nhập họ lót'
    hasError = true
  }

  if (!ten.value) {
    errorTen.value = 'Vui lòng nhập tên'
    hasError = true
  }

  if (!email.value) {
    errorEmail.value = 'Vui lòng nhập email'
    hasError = true
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      errorEmail.value = 'Email không hợp lệ'
      hasError = true
    }
  }

  if (!password.value) {
    errorPassword.value = 'Vui lòng nhập mật khẩu'
    hasError = true
  } else if (password.value.length < 6) {
    errorPassword.value = 'Mật khẩu phải từ 6 ký tự'
    hasError = true
  }

  if (!confirm.value) {
    errorConfirm.value = 'Vui lòng xác nhận mật khẩu'
    hasError = true
  } else if (password.value !== confirm.value) {
    errorConfirm.value = 'Mật khẩu không khớp'
    hasError = true
  }

  if (hasError) return

  try {
    const userRes = await axios.post('http://localhost:5000/api/users', {
      hoLot: hoLot.value,
      ten: ten.value,
      ngaySinh: ngaySinh.value,
      phai: phai.value,
      diaChi: diaChi.value,
      dienThoai: dienThoai.value
    })

    const refId = userRes.data._id

    await axios.post('http://localhost:5000/api/account/register', {
      email: email.value,
      password: password.value,
      role: 'user',
      refId,
      refModel: 'User'
    })

    message.value = 'Tạo tài khoản thành công 🎉'
    router.push('/auth/login')
  } catch (err) {
    message.value = err.response?.data?.message || 'Lỗi đăng ký tài khoản'
  }
}
</script>


