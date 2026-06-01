export interface UserState {
  user: null;
}

export const userNameCheckRequestType = "user/usernameCheckRequest";

export const userNameCheckRequestAction = (payload: unknown) => ({
  type: userNameCheckRequestType,
  payload: payload,
});
