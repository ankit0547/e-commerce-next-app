import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth/auth.service";
import { UserService } from "@/services/user/user.service";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: AuthService.register,
  });
};

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: AuthService.login,
    onSettled: (data: unknown) => {
      const user = (data as { user?: unknown } | undefined)?.user;
      if (user) dispatch(setUser(user));
    },
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
    refetchOnMount: "always",
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
