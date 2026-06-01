export interface LoginResponse {
  accessToken: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type RegisterResponse = User;

export interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiFieldError {
  errorKey: string;
  errorMessage: string;
}

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: ApiFieldError[];
}

export interface UserNameCheckResponse {
  exists: boolean;
}

export interface EmailCheckResponse {
  exists: boolean;
}
