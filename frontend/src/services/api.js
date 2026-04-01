const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Something went wrong');
    return data;
};

// Auth
export const register = (userData) => api('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
export const login = (credentials) => api('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
export const getCurrentUser = () => api('/auth/me');

// Tasks
export const getTasks = () => api('/tasks');
export const createTask = (taskData) => api('/tasks', { method: 'POST', body: JSON.stringify(taskData) });
export const completeTask = (taskId) => api(`/tasks/${taskId}/complete`, { method: 'POST' });
export const getTask = (taskId) => api(`/tasks/${taskId}`);
export const updateTask = (taskId, updates) => api(`/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(updates) });
export const deleteTask = (taskId) => api(`/tasks/${taskId}`, { method: 'DELETE' });

// Pet & Shop
export const getPet = () => api('/pet');
export const getShopItems = () => api('/shop/items');
export const purchaseItem = (itemId) => api('/shop/purchase', { method: 'POST', body: JSON.stringify({ itemId }) });
export const getUserInventory = () => api('/shop/inventory')

// Achievements
export const getAchievements = () => api('/achievements');
export const getUserAchievements = () => api('/achievements/user');
export const getAchievementProgress = () => api('/achievements/progress');

// Update user profile
export const updateUser = (userData) => api('/auth/update', {
    method: 'PUT',
    body: JSON.stringify(userData)
});

// Renamed to avoid React Hook conflict
export const applyItemToPet = (inventoryId) => api('/pet/use-item', { 
    method: 'POST', 
    body: JSON.stringify({ inventoryId }) 
});