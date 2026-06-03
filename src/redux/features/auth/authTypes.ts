// interface User {
//   firstname: string;
//   lastname: string;
//   avtar:
// }

export interface AuthState {
  user: object | null;
  isLoadingProfile: boolean;
}

export const registerRequestType = "auth/registerRequest";

export const registerRequestAction = (payload: unknown) => ({
  type: registerRequestType,
  payload: payload,
});
