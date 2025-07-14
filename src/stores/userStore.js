import { defineStore } from "pinia";


export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        avatarUrl: '',
        token: '',
        userId: '', 
        isLoggedIn: false,
    }),

    actions: {
        login(user) {
            this.username = user.username
            this.avatarUrl = user.avatarUrl || ''
            this.token = user.token
            this.isLoggedIn = true
            localStorage.setItem('token', user.token)
            localStorage.setItem('username', user.username)
            localStorage.setItem('userId', user.userId)
        },

        logout () {
            this.username = '' 
            this.avatarUrl =  ''
            this.token = ''
            this.userId = ''   
            this.isLoggedIn = false

            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('userId')
        },
        
        initFromStorage(){
            const token = localStorage.getItem('token')
            if(token) {
                this.token = token
                this.isLoggedIn = true
                this.username = localStorage.getItem('username') || 'Người dùng'
                this.userId = localStorage.getItem('userId') || '' 
            }
        }
    }
})