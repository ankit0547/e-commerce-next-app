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

export interface EditProfileForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: {
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const registerRequestType = "auth/registerRequest";

export const registerRequestAction = (payload: unknown) => ({
  type: registerRequestType,
  payload: payload,
});
