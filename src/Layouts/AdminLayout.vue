<template>
  <div class="flex h-screen bg-gray-100">
    <aside class="w-64 flex-shrink-0 bg-gray-800 text-white p-4">
      <h2 class="text-xl font-bold mb-8">Admin Panel</h2>
      <nav>
        <ul>
          <li class="mb-4">
            <router-link to="/" class="hover:text-blue-300">Quay về trang chủ</router-link>
          </li>
          <li class="mb-4">
            <router-link to="/admin/dashboard" class="hover:text-blue-300">Bảng điều khiển</router-link>
          </li>
          <li class="mb-4">
              <router-link to="/admin/manage-content" class="hover:text-blue-300">Quản lý Nội dung</router-link>
          </li>
          <li class="mb-4">
              <router-link to="/admin/manage-users" class="hover:text-blue-300">Quản lý Người dùng</router-link>
          </li>
          <li class="mb-4">
              <router-link to="/admin/manage-borrow" class="hover:text-blue-300">Quản lý Mượn/Trả</router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 overflow-y-auto">
      <div class="p-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
// Script có thể để trống nếu không có logic đặc biệt
</script>