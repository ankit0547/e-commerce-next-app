import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth.service";
import { UserService } from "@/services/user/user.service";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: AuthService.register,
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: AuthService.login,
  });
};

export const useCheckUsernameExistsMutation = () => {
  return useMutation({
    mutationFn: AuthService.checkUsernameExists,
  });
};

export const useCheckEmailExistsMutation = () => {
  return useMutation({
    mutationFn: AuthService.checkEmailExists,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: AuthService.logout,
  });
};

export const useUserProfileQuery = ({
  enabled = true,
  retry = false,
}: {
  enabled?: boolean;
  retry?: boolean;
}) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: UserService.getUserProfile,
    enabled,
    retry,
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: AuthService.resetPassword,
  });
};
