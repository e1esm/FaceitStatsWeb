import { defineStore } from 'pinia';

export const useSharedStore = defineStore('authStore', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        updateAuthState(newValue) {
            this.isAuthenticated = newValue;
        },

        setUser(newValue) {
            this.user = newValue;
        }
    }
});