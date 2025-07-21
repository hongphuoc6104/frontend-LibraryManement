import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        userId: '',
        token: '',
        role: '',
        isLoggedIn: false,
    }),

    actions: {
        // PHIÊN BẢN SỬA LỖI HOÀN CHỈNH
        login(data) {
            // Gán giá trị cho state từ object `data` (là res.data)
            this.token = data.token;
            this.role = data.role;
            this.userId = data.userInfo.userId; // Lấy ID từ object con userInfo
            this.username = data.userInfo.hoTenNV || data.userInfo.fullName || 'Người dùng';
            this.isLoggedIn = true;

            // Lưu vào localStorage từ state (đã được gán giá trị đúng)
            localStorage.setItem('token', this.token);
            localStorage.setItem('role', this.role);
            localStorage.setItem('userId', this.userId);
            localStorage.setItem('username', this.username);
        },

        logout() {
            // Xóa state
            this.username = '';
            this.userId = '';
            this.token = '';
            this.role = '';
            this.isLoggedIn = false;

            // Xóa toàn bộ localStorage để đảm bảo sạch sẽ
            localStorage.clear();
        },
        
        initFromStorage() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                this.isLoggedIn = true;
                this.role = localStorage.getItem('role') || '';
                this.userId = localStorage.getItem('userId') || ''; // Đọc ID từ localStorage
                this.username = localStorage.getItem('username') || '';
            }
        }
    }
});