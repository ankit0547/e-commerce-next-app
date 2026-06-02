import { invokeApi } from "../../lib/axios/invokeApi";
import APIConstants from "../../lib/axios/Constants";
import { LoginPayload, RegisterUserPayload } from "@/types/error.types";

export const AuthService = {
  register: async (payload: RegisterUserPayload) => {
    return (await invokeApi(APIConstants.REGISTER_REQUEST, payload)).data;
  },
  login: async (payload: LoginPayload) => {
    return (await invokeApi(APIConstants.LOGIN_REQUEST, payload)).data;
  },
  logout: async () => {
    return (await invokeApi(APIConstants.LOGOUT_REQUEST)).data;
  },
  checkUsernameExists: async (payload: { username: string }) => {
    const result = await invokeApi(
      APIConstants.USERNAME_CHECK_REQUEST,
      payload,
    );
    return result.data as { exists: boolean };
  },
  checkEmailExists: async (payload: { email: string }) => {
    const result = await invokeApi(APIConstants.EMAIL_CHECK_REQUEST, payload);
    return result.data as { exists: boolean };
  },

  forgotPassword: async (payload: { email: string }) => {
    return (await invokeApi(APIConstants.FORGOT_PASSWORD_REQUEST, payload))
      .data;
  },

  resetPassword: async (payload: {
    password: string;
    confirmPassword: string;
    resetToken: string;
  }) => {
    return (await invokeApi(APIConstants.RESET_PASSWORD_REQUEST, payload)).data;
  },
};
