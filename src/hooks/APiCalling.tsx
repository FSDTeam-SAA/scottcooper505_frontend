import { createContact } from "@/lib/contact";
import { changePassword, getProfile, updateProfileInfo, uploadAvatar } from "@/lib/profile";
import { IUserProfileResponse } from "@/types/userDataType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useCreateContact( onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { name: string; email: string; address: string; phoneNumber: string; subject: string; message: string; }) => createContact(payload),
        onSuccess: () => {
            toast.success("message sent successfully!");
            queryClient.invalidateQueries({ queryKey: ["contact"] });
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (error: unknown) => {
            if (error instanceof Error) toast.error(error.message || "something failed");
            else toast.error("something failed");
        },
    });
}

export function useAvatarMutation(
  token: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file, token),
    onSuccess: (data) => {
      toast.success(data.message || "Avatar updated successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message || "Image upload failed");
      } else {
        toast.error("Image upload failed");
      }
    },
  });
}

export function useProfileQuery(token: string | undefined) {
  return useQuery<IUserProfileResponse>({
    queryKey: ["me"],
    queryFn: () => {
      if (!token) throw new Error("Token is missing");
      return getProfile(token);
    },
    enabled: !!token,
  });
}


export function useProfileInfoUpdate(
  token: string,
  onSuccessCallback?: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload:{ fullName: string; email: string; phoneNumber: string; city: string; country: string;}) =>
      updateProfileInfo(token, payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) toast.error(error.message || "Update failed");
      else toast.error("Update failed");
    },
  });
}


export function useChnagePassword(
  token: string,
  onSuccessCallback?: () => void
) {
  return useMutation({
    mutationFn: (payload: { oldPassword: string; newPassword: string }) =>
      changePassword(token, payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Password updated successfully");
      if (onSuccessCallback) onSuccessCallback();
      
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message || "Update failed");
      else toast.error("Update failed");
    },
  });
}