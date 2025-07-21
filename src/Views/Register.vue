<template>
  <form @submit.prevent="handleRegister" class="max-w-md mx-auto space-y-8 px-6 py-4">
    <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-2">
      Tạo tài khoản mới
    </h2>
    <p class="text-center text-gray-600 mb-8">
      Vui lòng điền đầy đủ thông tin để đăng ký thành viên Thư Viện Trực Tuyến.
    </p>

    <div class="space-y-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
        Thông tin tài khoản
      </h3>
      <div>
        <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email <span class="text-red-500">*</span></label>
        <div class="relative">
          <input v-model="email" type="email" id="email" required placeholder="Ví dụ: ban@example.com"
            class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                   focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                   transition-all duration-300 ease-in-out shadow-sm" />
          <svg class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
          </svg>
        </div>
        <p v-if="errorEmail" class="text-red-600 text-sm mt-1">{{ errorEmail }}</p>
      </div>

      <div>
        <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu <span class="text-red-500">*</span></label>
        <div class="relative">
          <input v-model="password" type="password" id="password" required placeholder="Tối thiểu 6 ký tự"
            class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                   focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                   transition-all duration-300 ease-in-out shadow-sm" />
          <svg class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p v-if="errorPassword" class="text-red-600 text-sm mt-1">{{ errorPassword }}</p>
      </div>

      <div>
        <label for="confirm" class="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu <span class="text-red-500">*</span></label>
        <div class="relative">
          <input v-model="confirm" type="password" id="confirm" required placeholder="Nhập lại mật khẩu"
            class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                   focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                   transition-all duration-300 ease-in-out shadow-sm" />
          <svg class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p v-if="errorConfirm" class="text-red-600 text-sm mt-1">{{ errorConfirm }}</p>
      </div>
    </div>

    <div class="space-y-6 pt-6"> <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">
        Thông tin cá nhân
      </h3>
      <div>
        <label for="hoLot" class="block text-sm font-semibold text-gray-700 mb-2">Họ lót <span class="text-red-500">*</span></label>
        <input v-model="hoLot" type="text" id="hoLot" required placeholder="Ví dụ: Nguyễn Văn"
          class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-sm" />
        <p v-if="errorHoLot" class="text-red-600 text-sm mt-1">{{ errorHoLot }}</p>
      </div>

      <div>
        <label for="ten" class="block text-sm font-semibold text-gray-700 mb-2">Tên <span class="text-red-500">*</span></label>
        <input v-model="ten" type="text" id="ten" required placeholder="Ví dụ: A"
          class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-sm" />
        <p v-if="errorTen" class="text-red-600 text-sm mt-1">{{ errorTen }}</p>
      </div>

      <div>
        <label for="ngaySinh" class="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
        <div class="relative">
            <input v-model="ngaySinh" type="date" id="ngaySinh"
                class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                       focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                       transition-all duration-300 ease-in-out shadow-sm pr-12" /> <svg class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h.01M12 11h.01M15 11h.01M7 15h.01M11 15h.01M15 15h.01M17 19H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
            </svg>
        </div>
      </div>

      <div>
        <label for="phai" class="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
        <select v-model="phai" id="phai"
          class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 
                 focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-sm bg-white cursor-pointer">
          <option value="" disabled selected>--Chọn giới tính--</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>

      <div>
        <label for="diaChi" class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
        <input v-model="diaChi" type="text" id="diaChi" placeholder="Ví dụ: 123 Đường ABC, Quận XYZ"
          class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-sm" />
      </div>
      
      <div>
        <label for="dienThoai" class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
        <input v-model="dienThoai" type="tel" id="dienThoai" placeholder="Ví dụ: 0901234567"
          class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-sm" />
      </div>
    </div>

    <button type="submit"
      class="w-full bg-gray-800 text-white font-bold py-3 rounded-xl shadow-lg mt-8 
             hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 
             transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
    >
      Đăng ký tài khoản
    </button>

    <p v-if="message" :class="message.includes('thành công') ? 'text-green-600' : 'text-red-600'" 
       class="text-center font-medium mt-4 flex items-center justify-center">
        <svg v-if="message.includes('thành công')" class="h-5 w-5 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <svg v-else class="h-5 w-5 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {{ message }}
    </p>

    <p class="text-center text-sm text-gray-600 mt-6">
      Đã có tài khoản?
      <router-link to="/auth/login" class="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-colors duration-200">
        Đăng nhập ngay
      </router-link>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// 🧍 Info cá nhân
const hoLot     = ref('')
const ten       = ref('')
const ngaySinh  = ref('')
const phai      = ref('')
const diaChi    = ref('')
const dienThoai = ref('')

// 🔐 Tài khoản
const email    = ref('')
const password = ref('')
const confirm  = ref('')
const message  = ref('')

const errorHoLot    = ref('')
const errorTen      = ref('')
const errorEmail    = ref('')
const errorPassword = ref('')
const errorConfirm  = ref('')

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
    errorHoLot.value = 'Vui lòng nhập họ lót.'
    hasError = true
  }

  if (!ten.value) {
    errorTen.value = 'Vui lòng nhập tên.'
    hasError = true
  }

  if (!email.value) {
    errorEmail.value = 'Vui lòng nhập email.'
    hasError = true
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      errorEmail.value = 'Email không hợp lệ.'
      hasError = true
    }
  }

  if (!password.value) {
    errorPassword.value = 'Vui lòng nhập mật khẩu.'
    hasError = true
  } else if (password.value.length < 6) {
    errorPassword.value = 'Mật khẩu phải từ 6 ký tự.'
    hasError = true
  }

  if (!confirm.value) {
    errorConfirm.value = 'Vui lòng xác nhận mật khẩu.'
    hasError = true
  } else if (password.value !== confirm.value) {
    errorConfirm.value = 'Mật khẩu không khớp.'
    hasError = true
  }

  if (hasError) {
    message.value = 'Vui lòng kiểm tra lại các trường bị lỗi.'
    return
  }

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
    setTimeout(() => {
      router.push('/auth/login')
    }, 2000) // Chuyển hướng sau 2 giây để người dùng đọc thông báo
  } catch (err) {
    message.value = err.response?.data?.message || 'Đã có lỗi xảy ra khi đăng ký tài khoản. Vui lòng thử lại.'
  }
}
</script>