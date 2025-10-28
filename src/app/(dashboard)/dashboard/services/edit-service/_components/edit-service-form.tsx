"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ImagePlus, Upload, X, Plus, Trash2 } from "lucide-react";
import {
  useForm,
  useFieldArray,
  type UseFormReturn,
  type Resolver,
} from "react-hook-form";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface ServiceResponse {
  status: boolean;
  message: string;
  data: ServiceData;
}

export interface ServiceData {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  duration: string;
  schedule: Schedule[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  generatedSlots: GeneratedSlot[];
}

export interface Schedule {
  date: string; // ISO date string
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
}

export interface GeneratedSlot {
  date: string; // ISO date string
  slots: Slot[];
}

export interface Slot {
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
}

const scheduleSchema = z.object({
  date: z.date({ message: "Date is required" }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z.string().min(2, "Description must be at least 2 characters."),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(
      /^(?:\d+h(?:\d+m)?|\d+m)$/,
      "Duration must include time unit — use 'm' for minutes or 'h' for hours (e.g., 30m, 1h)"
    ),
  thumbnail: z.instanceof(File).optional(),
  schedule: z.array(scheduleSchema).min(1, "At least one schedule is required"),
});

/* -------------------------------------------------
   Type derived from the schema
   ------------------------------------------------- */
type FormValues = z.infer<typeof formSchema>;

export default function EditServiceForm({ serviceId }: { serviceId: string }) {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const router = useRouter();
  const [isDragOver, setIsDragOver] = React.useState(false);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  /* -------------------------------------------------
     useForm – fully typed
     ------------------------------------------------- */
  const form: UseFormReturn<FormValues> = useForm<FormValues>({
    resolver: zodResolver(formSchema) as unknown as Resolver<FormValues>,
    defaultValues: {
      title: "",
      price: 1,
      description: "",
      duration: "",
      thumbnail: undefined,
      schedule: [{ date: new Date(), startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  /* -------------------------------------------------
     Image handling (preview only)
     ------------------------------------------------- */
  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      form.setValue("thumbnail", file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  // get by id api integration

  const { data, isLoading, isError, error } = useQuery<ServiceResponse>({
    queryKey: ["service", serviceId],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${serviceId}`).then(
        (res) => res.json()
      ),
  });

  console.log(data);
  React.useEffect(() => {
    if (data) {
      form.setValue("title", data.data.title);
      form.setValue("price", data.data.price);
      form.setValue("description", data.data.description);
      form.setValue("duration", data.data.duration);
      setPreviewImage(data.data.thumbnail);
      form.setValue(
        "schedule",
        data.data.schedule.map((schedule) => ({
          ...schedule,
          date: new Date(schedule.date),
        }))
      );
    }
  }, [data, form]);

  //  edit  api integration

  const { mutate, isPending } = useMutation({
    mutationKey: ["edit-service", serviceId],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${serviceId}`, {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Failed to edit service");
        return;
      } else {
        toast.success(data?.message || "Service updated successfully");
        form.reset();
        router.push("/dashboard/services");
      }
    },
  });

  if (isLoading) {
    return <div>loading ...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  const onSubmit = (values: FormValues) => {
    console.log("Form values (design preview):", values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("price", values.price.toString());
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("thumbnail", values.thumbnail as File);
    formData.append("schedule", JSON.stringify(values.schedule));
    mutate(formData);
  };

  return (
    <div>
      <PathTracker />
      <div className="pt-8 md:pt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
             {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                disabled={isPending}
                type="submit"
                size="lg"
                className="px-8"
              >
                {isPending ? "Publishing..." : "Publish"}
              </Button>
            </div>
            {/* ---------- GRID LAYOUT ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ---------- LEFT COLUMN ---------- */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-black leading-[120%]">
                        Service Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Premium Haircut & Styling"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price + Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            type="number"
                            placeholder="200"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-black leading-[120%]">
                          Duration
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 1h 30m"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ---------- SCHEDULES ---------- */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {/* <FormLabel className="text-base font-semibold">
                      Availability Schedule
                    </FormLabel> */}
                    <h3 className="text-base font-semibold text-black leading-[120%]">
                      Availability Schedule
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        append({ date: new Date(), startTime: "", endTime: "" })
                      }
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" /> Add Schedule
                    </Button>
                  </div>

                  {fields.map((item, idx) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 border rounded-lg bg-gray-50"
                    >
                      {/* Date */}
                      <FormField
                        control={form.control}
                        name={`schedule.${idx}.date`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold text-black leading-[120%]">
                              Date
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full justify-start text-left h-12 ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value
                                      ? format(field.value, "MMM dd, yyyy")
                                      : "Pick date"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Start Time */}
                      <FormField
                        control={form.control}
                        name={`schedule.${idx}.startTime`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold text-black leading-[120%]">
                              Start Time
                            </FormLabel>
                            <FormControl>
                              <Input type="time" className="h-12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* End Time + Delete */}
                      <div className="flex gap-2 items-end">
                        <FormField
                          control={form.control}
                          name={`schedule.${idx}.endTime`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-base font-semibold text-black leading-[120%]">
                                End Time
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="time"
                                  className="h-12"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(idx)}
                            className="h-12 w-12 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {form.formState.errors.schedule?.root && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.schedule.root.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-black leading-[120%]">
                        Description
                      </FormLabel>
                      <FormControl>
                        <QuillEditor
                          id="description"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ---------- RIGHT COLUMN – IMAGE ---------- */}
              <div className="lg:col-span-1">
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-black leading-[120%]">
                        Image
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          {/* No image */}
                          {!previewImage ? (
                            <div
                              className={`
                                h-80 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
                                ${
                                  isDragOver
                                    ? "border-blue-500 bg-blue-50"
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
                              <div className="flex flex-col items-center justify-center h-full space-y-3">
                                <ImagePlus className="w-12 h-12 text-gray-400" />
                                <p className="text-sm text-gray-600">
                                  Drag & drop or{" "}
                                  <span className="text-blue-600 underline">
                                    browse
                                  </span>
                                </p>
                              </div>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageChange(file);
                                }}
                              />
                            </div>
                          ) : (
                            /* Image preview with overlay */
                            <div className="relative group">
                              <Image
                                width={400}
                                height={320}
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-80 object-cover rounded-xl shadow-md"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    document
                                      .getElementById("image-upload")
                                      ?.click()
                                  }
                                  className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
                                >
                                  <Upload className="h-5 w-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPreviewImage(null);
                                    form.setValue("thumbnail", undefined);
                                  }}
                                  className="bg-white p-3 rounded-full shadow-lg hover:bg-red-50"
                                >
                                  <X className="h-5 w-5 text-red-600" />
                                </button>
                              </div>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageChange(file);
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

           
          </form>
        </Form>
      </div>
    </div>
  );
}
