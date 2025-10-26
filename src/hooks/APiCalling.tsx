import { createContact } from "@/lib/contact";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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