// interface User {
//   firstname: string;
//   lastname: string;
//   avtar:
// }

export interface AuthState {
  user: object | null;
}

export const registerRequestType = "auth/registerRequest";

export const registerRequestAction = (payload: unknown) => ({
  type: registerRequestType,
  payload: payload,
});
