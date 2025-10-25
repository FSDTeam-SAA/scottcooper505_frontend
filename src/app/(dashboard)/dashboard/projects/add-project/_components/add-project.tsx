"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";
import { AddProjectForm } from "./add-project-form";
import { projectFormSchema } from "@/schema/projectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "@/components/ui/form";

export type ProjectFormValues = z.input<typeof projectFormSchema>;

export const AddProject = () => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      location: "",
      areaType: "",
      description: "",
      image: "",
      video: "",
    },
  });

  const onSubmit = (value: ProjectFormValues) => {
    console.log("values : ", value);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between">
            <PathTracker />

            <Button type="submit">
              <Save /> Save Project
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
