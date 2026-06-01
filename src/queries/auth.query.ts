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

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: UserService.getUserProfile,
  });
};
