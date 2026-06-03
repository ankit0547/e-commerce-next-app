export interface LoginResponse {
  accessToken: string;
}

type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type Avatar = {
  url: string;
};
export interface User {
  address: Address;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: Avatar;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
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
