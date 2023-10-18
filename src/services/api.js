import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.joeleprof.com/letsplay',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const apiLogin = (formData) => {
  return api.post('/auth/login', formData);
};

export const apiRegister = (formData) => {
  return api.post('/auth/register', formData);
};

export const apiGetUser = () => {
  return api.get('/me');
};

export const apiUpdateUser = (formData) => {
  return api.put('/me', formData);
};

export const apiDeleteUser = () => {
  return api.delete('/me');
};

export const apiResetUserScore = () => {
  return api.put('/me/reset-score');
};

export const apiGetUsers = () => {
  return api.get('/users');
};

export const apiUpdateUserAdmin = (id, formData) => {
  return api.put(`/users/${id}`, formData);
};

export const apiDeleteUserAdmin = (id) => {
  return api.delete(`/users/${id}`);
};

export const apiAddPoints = (points) => {
  return api.put('/game/wins', { points });
};

export const apiRemovePoints = (points) => {
  return api.put('/game/lost', { points });
};

export default api;
