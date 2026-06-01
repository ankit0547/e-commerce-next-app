export interface AuthState {
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
}

export const registerRequestType = "auth/registerRequest";

export const registerRequestAction = (payload: unknown) => ({
  type: registerRequestType,
  payload: payload,
});
