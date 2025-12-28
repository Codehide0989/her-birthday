import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      setAuth: (user, token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
        });
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        toast.success('Logged out successfully');
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.login(credentials);
          const { user, token, refreshToken } = response.data.data;
          
          set({
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);

          toast.success('Login successful!');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Login failed';
          toast.error(message);
          return { success: false, message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await authAPI.register(userData);
          const { user, token, refreshToken } = response.data.data;
          
          set({
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });

          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);

          toast.success('Registration successful! Trial started.');
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          const message = error.response?.data?.message || 'Registration failed';
          toast.error(message);
          return { success: false, message };
        }
      },

      fetchProfile: async () => {
        try {
          const response = await authAPI.getProfile();
          const user = response.data.data.user;
          set({ user });
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
