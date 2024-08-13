import axios from './axios';

export const registerRequest = user => axios.post(`/register`, user)
export const loginRequest = user => axios.post(`/login`, user)
export const verifyTokenRequest = () => axios.get(`/verify`)
export const getUserData = (id) => axios.get(`/profile/${id}`);
export const updateProfileRequest = (id, user) => axios.put(`/profile/${id}`, user);
export const updatePasswordRequest = (id, pass) => axios.put(`/updatePassword/${id}`, pass);
export const forgotPasswordRequest = email => axios.post(`/forgotPassword`, email);
export const resetPasswordRequest = data => axios.put(`/resetPassword`, data);
export const deleteAccountRequest = (id) => axios.delete(`/deleteAccount/${id}`);