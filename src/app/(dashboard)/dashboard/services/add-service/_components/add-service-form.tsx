"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ImagePlus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import QuillEditor from "@/components/ui/quill-editor";
import Image from "next/image";

// ✅ Zod validation schema
const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  price: z.string().min(2, { message: "Price must be at least 2 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  date: z.date({
    message: "Please select a date.",
  }),
  thumbnail: z.any().optional(),
  startTime: z.string().min(1, { message: "Start time is required." }),
  endTime: z.string().min(1, { message: "End time is required." }),
  duration: z.string().min(1, { message: "Duration is required." }),
});

const AddServiceForm = () => {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      date: new Date(),
      description: "",
      startTime: "",
      endTime: "",
      duration: "",
      thumbnail: undefined,
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted Data:", values);
  }

  const handleImageChange = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("thumbnail", [file]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleImageChange(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div>
      <PathTracker />
      <div className="pt-8 md:pt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {/* Left Section */}
              <div className="md:col-span-2 space-y-6">
                {/* Title Field */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-black leading-[120%]">
                        Add Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-[50px] border border-[#B6B6B6] rounded-[4px] text-lg font-medium leading-[120%] text-black"
                          placeholder="Add your title..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Price Field */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-black leading-[120%]">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-[50px] border border-[#B6B6B6] rounded-[4px] text-lg font-medium leading-[120%] text-black"
                            placeholder="Add price..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* duration  */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-black">
                          Duration
                        </FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Write Duration"
                            className="h-[50px]  border border-[#B6B6B6] text-lg font-medium text-black "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Start Time + End Time + Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Date Picker Field */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col pt-1">
                        <FormLabel className="text-base font-semibold text-black leading-[120%]">
                          Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`w-full justify-start text-left font-normal h-[50px] border border-[#B6B6B6] rounded-[4px] text-lg ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                {field.value ? (
                                  format(field.value, "MMMM dd, yyyy")
                                ) : (
                                  <span>Select a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-black">
                          Start Time
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write Here"
                            type="time"
                            className="h-[50px] border border-[#B6B6B6] text-lg font-medium text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-black">
                          End Time
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write Here"
                            type="time"
                            className="h-[50px] border border-[#B6B6B6] text-lg font-medium text-black "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* description  */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                        Description
                      </FormLabel>
                      <FormControl className="">
                        <QuillEditor
                          id="content"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Section */}
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
                        Image
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          {!previewImage ? (
                            <div
                              className={`
                                  h-[310px] border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                                  ${
                                    isDragOver
                                      ? "border-blue-400 bg-blue-50"
                                      : "border-gray-300 hover:border-gray-400"
                                  }
                                `}
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onClick={() =>
                                document.getElementById("image-upload")?.click()
                              }
                            >
                              <div className="h-full flex flex-col items-center justify-center space-y-3">
                                <div className="">
                                  <ImagePlus className="w-[38px] h-[38px] text-gray-400 " />
                                </div>
                              </div>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleImageChange(file);
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            <div className="relative">
                              <Image
                                width={292}
                                height={277}
                                src={previewImage || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-[310px] object-cover rounded-lg border-2 border-dashed border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setPreviewImage(null);
                                  form.setValue("thumbnail", undefined);
                                }}
                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
                              >
                                <X className="h-4 w-4 text-gray-600" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  document
                                    .getElementById("image-upload")
                                    ?.click()
                                }
                                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
                              >
                                <Upload className="h-4 w-4 text-gray-600" />
                              </button>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleImageChange(file);
                                  }
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="mt-5">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddServiceForm;
