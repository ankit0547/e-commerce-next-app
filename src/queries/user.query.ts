import { UserService } from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useProfileUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserService.updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
      toast.success("Profile successfully updated!", {
        position: "top-right",
      });
    },
  });
};
