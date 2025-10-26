"use client";

import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import React, { useEffect } from "react";
import { AddProjectForm } from "./add-project-form";
import { projectFormSchema } from "@/schema/projectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export type ProjectFormValues = z.input<typeof projectFormSchema>;

interface PropertiesType {
  _id: string;
  title: string;
  location: string;
  areaType: string;
  description: string;
  images: string[];
  videos: string[];
  createdAt: string;
}

interface Props {
  projectDetails?: PropertiesType;
  id?: string;
}

export const AddEditProject = ({ projectDetails, id }: Props) => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const pathName = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      location: "",
      areaType: "",
      description: "",
      images: undefined,
      videos: undefined,
    },
  });

  useEffect(() => {
    if (pathName !== "/dashboard/projects/add-project" && projectDetails) {
      form.reset({
        title: projectDetails?.title || "",
        location: projectDetails?.location || "",
        areaType: projectDetails?.areaType || "",
        description: projectDetails?.description || "",
        images: projectDetails.images?.[0] || undefined,
        videos: projectDetails.videos?.[0] || undefined,
      });
    }
  }, [projectDetails, pathName, form]);

  type AddProjectResponse = {
    message: string;
    [key: string]: unknown;
  };

  const addProject = useMutation<AddProjectResponse, Error, ProjectFormValues>({
    mutationKey: ["add-project"],
    mutationFn: async (payload: ProjectFormValues) => {
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("location", payload.location);
      formData.append("areaType", payload.areaType);
      formData.append("description", payload.description);

      if (payload.images instanceof File) {
        formData.append("images", payload.images);
      }
      if (payload.videos instanceof File) {
        formData.append("videos", payload.videos);
      }

      let res: Response;

      if (pathName === "/dashboard/projects/add-project") {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      if (!res.ok) {
        throw new Error("Failed to add project!");
      }

      const result = await res.json();
      return result;
    },

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["project-details", "all-project"],
      });
      router.push("/dashboard/projects");
      form.reset();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (value: ProjectFormValues) => {
    try {
      await addProject.mutateAsync(value);
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <PathTracker />

            <Button
              disabled={addProject.isPending}
              type="submit"
              className="disabled:cursor-not-allowed"
            >
              {addProject.isPending ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  {pathName === "/dashboard/projects/add-project"
                    ? "Save Project"
                    : "Edit Project"}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Save />{" "}
                  {pathName === "/dashboard/projects/add-project"
                    ? "Save Project"
                    : "Edit Project"}
                </span>
              )}
            </Button>
          </div>

          <div className="mt-6">
            <AddProjectForm form={form} />
          </div>
        </form>
      </Form>
    </div>
  );
};
