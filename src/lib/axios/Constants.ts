const APIConstants = {
  REGISTER_REQUEST: {
    URL: "/auth/register",
    METHOD: "POST",
  },
  LOGIN_REQUEST: {
    URL: "/auth/login",
    METHOD: "POST",
  },
  USERNAME_CHECK_REQUEST: {
    URL: "/user/username-exists",
    METHOD: "GET",
  },
  EMAIL_CHECK_REQUEST: {
    URL: "/user/email-exists",
    METHOD: "GET",
  },
  LOGOUT_REQUEST: {
    URL: "/auth/logout",
    METHOD: "GET",
  },
  USER_PROFILE_REQUEST: {
    URL: "/user/profile",
    METHOD: "GET",
  },
};

export default APIConstants;
