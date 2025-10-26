"use client";

import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import React from "react";
import { AddProjectForm } from "./add-project-form";
import { projectFormSchema } from "@/schema/projectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export type ProjectFormValues = z.input<typeof projectFormSchema>;

export const AddProject = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to add project!");
      }

      const result = await res.json();
      return result;
    },

    onSuccess: (data) => {
      toast.success(data.message || "Project added successfully!");
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
                  <Loader2 className="h-4 w-4 animate-spin" /> Save Project
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Save /> Save Project
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
