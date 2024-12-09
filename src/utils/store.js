import { defineStore } from 'pinia';

export const useSharedStore = defineStore('authStore', {
    state: () => ({
        isAuthenticated: false,
    }),
    actions: {
        updateAuthState(newValue) {
            this.isAuthenticated = newValue;
        }
    }
});