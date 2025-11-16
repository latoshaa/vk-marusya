export interface AuthInfo {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface User {
  name: string;
  surname: string;
  email: string;
  favorites: number[];
}

export interface AuthResponse {
  result: boolean;
}

export interface AuthError {
  error: string;
}