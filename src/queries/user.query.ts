import { UserService } from "@/services/user/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProfileUpdateMutation = () => {
  return useMutation({
    mutationFn: UserService.updateUserProfile,
  });
};
