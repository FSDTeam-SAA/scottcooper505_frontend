"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const DeleteProject = ({ id }: { id: string }) => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['all-project']});
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.log(`error from delete project. error : ${error}`);
    }
  };

  return (
    <button disabled={deleteMutation.isPending} onClick={handleDelete}>
      {deleteMutation.isPending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Trash className="h-5 w-5" />
      )}
    </button>
  );
};

export default DeleteProject;
