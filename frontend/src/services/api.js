import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken }
        );

        const { token, refreshToken: newRefreshToken } = response.data.data;

        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

export const subscriptionAPI = {
  createCheckoutSession: (planType) =>
    api.post('/subscription/create-checkout-session', { planType }),
  getSubscription: () => api.get('/subscription/current'),
  cancelSubscription: () => api.post('/subscription/cancel'),
  getPaymentHistory: () => api.get('/subscription/payments'),
};

export const contentAPI = {
  getSubjects: () => api.get('/content/subjects'),
  getChapters: (subjectId) => api.get(`/content/subjects/${subjectId}/chapters`),
  getModules: (chapterId) => api.get(`/content/chapters/${chapterId}/modules`),
  getContents: (moduleId) => api.get(`/content/modules/${moduleId}/contents`),
  getContent: (contentId) => api.get(`/content/contents/${contentId}`),
};

export default api;
