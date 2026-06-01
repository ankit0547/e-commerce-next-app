import { invokeApi } from "../../lib/axios/invokeApi";
import APIConstants from "../../lib/axios/Constants";

export const UserService = {
  getUserProfile: async () => {
    return (await invokeApi(APIConstants.USER_PROFILE_REQUEST)).data;
  },
};
