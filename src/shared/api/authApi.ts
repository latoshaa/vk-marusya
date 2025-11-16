import { api } from './config';
import { AuthInfo, RegisterData, User, AuthResponse } from '../types/auth';

export const loginUser = async (credentials: AuthInfo): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/user', userData);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.get('/auth/logout');
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>('/profile');
  return response.data;
}