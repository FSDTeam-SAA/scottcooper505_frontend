"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "./add-edit-project";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "./RichTextEditor";
import UploadImgVideo from "./upload-img-video";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  form: UseFormReturn<ProjectFormValues>;
}

export const AddProjectForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
      <div className="lg:w-[75%] border border-gray-400 rounded-lg p-5">
        {/* project title field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter your project title"
                  type="text"
                  className="h-[45px] border border-gray-300"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 mt-6 w-full">
          <div className="lg:w-1/2 w-full">
            {/* location field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your location"
                      type="text"
                      className="h-[45px] border border-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="lg:w-1/2 w-full">
            {/* area type field */}
            <FormField
              control={form.control}
              name="areaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-[45px] border border-gray-300">
                        <SelectValue placeholder="Select area type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* react quil text editor */}
        <div className="mt-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="lg:w-[25%]">
        <UploadImgVideo form={form} />
      </div>
    </div>
  );
};
