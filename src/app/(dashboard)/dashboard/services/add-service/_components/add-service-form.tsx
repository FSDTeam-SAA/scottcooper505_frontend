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
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/* -------------------------------------------------
   Zod schema – exact shape you need
   ------------------------------------------------- */
const scheduleSchema = z.object({
  date: z.date({ message: "Date is required" }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z.string().min(2, "Description must be at least 2 characters."),
  duration: z.string().min(1, "Duration is required"),
  thumbnail: z.instanceof(File).optional(),
  schedule: z.array(scheduleSchema).min(1, "At least one schedule is required"),
});

/* -------------------------------------------------
   Type derived from the schema
   ------------------------------------------------- */
type FormValues = z.infer<typeof formSchema>;

export default function AddServiceForm() {
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

  //   api integration

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-service"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/service`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Failed to add service");
        return;
      } else {
        toast.success(data?.message || "Service added successfully");
        form.reset();
        router.push("/dashboard/services");
      }
    },
  });

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
                      <FormLabel className="text-base font-semibold">
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
                        <FormLabel className="text-base font-semibold">
                          Price ($)
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
                        <FormLabel className="text-base font-semibold">
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
                    <h3 className="text-base font-semibold">
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
                      <FormLabel className="text-base font-semibold">
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
                      <FormLabel className="text-base font-semibold">
                        Service Image
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
          </form>
        </Form>
      </div>
    </div>
  );
}

// "use client";

// import * as React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { CalendarIcon, ImagePlus, Upload, X } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import PathTracker from "@/app/(dashboard)/_components/path-tracker";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { format } from "date-fns";
// import QuillEditor from "@/components/ui/quill-editor";
// import Image from "next/image";

// // ✅ Zod validation schema
// const formSchema = z.object({
//   title: z.string().min(2, { message: "Title must be at least 2 characters." }),
//   price: z.string().min(2, { message: "Price must be at least 2 characters." }),
//   description: z
//     .string()
//     .min(2, { message: "Description must be at least 2 characters." }),
//   date: z.date({
//     message: "Please select a date.",
//   }),
//   thumbnail: z.any().optional(),
//   startTime: z.string().min(1, { message: "Start time is required." }),
//   endTime: z.string().min(1, { message: "End time is required." }),
//   duration: z.string().min(1, { message: "Duration is required." }),
// });

// const AddServiceForm = () => {
//   const [previewImage, setPreviewImage] = React.useState<string | null>(null);
//   const [isDragOver, setIsDragOver] = React.useState(false);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       price: "",
//       date: new Date(),
//       description: "",
//       startTime: "",
//       endTime: "",
//       duration: "",
//       thumbnail: undefined,
//     },
//   });

//   // Submit handler
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log("Submitted Data:", values);
//   }

//   const handleImageChange = (file: File) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       form.setValue("thumbnail", [file]);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = e.dataTransfer.files;
//     if (files.length > 0 && files[0].type.startsWith("image/")) {
//       handleImageChange(files[0]);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   return (
//     <div>
//       <PathTracker />
//       <div className="pt-8 md:pt-10">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
//               {/* Left Section */}
//               <div className="md:col-span-2 space-y-6">
//                 {/* Title Field */}
//                 <FormField
//                   control={form.control}
//                   name="title"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-base font-semibold text-black leading-[120%]">
//                         Add Title
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="h-[50px] border border-[#B6B6B6] rounded-[4px] text-lg font-medium leading-[120%] text-black"
//                           placeholder="Add your title..."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage className="text-red-500" />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Price Field */}
//                   <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-base font-semibold text-black leading-[120%]">
//                           Price
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className="h-[50px] border border-[#B6B6B6] rounded-[4px] text-lg font-medium leading-[120%] text-black"
//                             placeholder="Add price..."
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage className="text-red-500" />
//                       </FormItem>
//                     )}
//                   />

//                   {/* duration  */}
//                   <FormField
//                     control={form.control}
//                     name="duration"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-base font-semibold text-black">
//                           Duration
//                         </FormLabel>
//                         <FormControl className="">
//                           <Input
//                             placeholder="Write Duration"
//                             className="h-[50px]  border border-[#B6B6B6] text-lg font-medium text-black "
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 {/* Start Time + End Time + Duration */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {/* Date Picker Field */}
//                   <FormField
//                     control={form.control}
//                     name="date"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col pt-1">
//                         <FormLabel className="text-base font-semibold text-black leading-[120%]">
//                           Date
//                         </FormLabel>
//                         <Popover>
//                           <PopoverTrigger asChild>
//                             <FormControl>
//                               <Button
//                                 variant="outline"
//                                 className={`w-full justify-start text-left font-normal h-[50px] border border-[#B6B6B6] rounded-[4px] text-lg ${
//                                   !field.value && "text-muted-foreground"
//                                 }`}
//                               >
//                                 {field.value ? (
//                                   format(field.value, "MMMM dd, yyyy")
//                                 ) : (
//                                   <span>Select a date</span>
//                                 )}
//                                 <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                               </Button>
//                             </FormControl>
//                           </PopoverTrigger>
//                           <PopoverContent className="w-auto p-0" align="start">
//                             <Calendar
//                               mode="single"
//                               selected={field.value}
//                               onSelect={field.onChange}
//                               initialFocus
//                             />
//                           </PopoverContent>
//                         </Popover>
//                         <FormMessage className="text-red-500" />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="startTime"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-base font-semibold text-black">
//                           Start Time
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Write Here"
//                             type="time"
//                             className="h-[50px] border border-[#B6B6B6] text-lg font-medium text-black"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="endTime"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-base font-semibold text-black">
//                           End Time
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Write Here"
//                             type="time"
//                             className="h-[50px] border border-[#B6B6B6] text-lg font-medium text-black "
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 {/* description  */}
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
//                         Description
//                       </FormLabel>
//                       <FormControl className="">
//                         <QuillEditor
//                           id="content"
//                           value={field.value}
//                           onChange={field.onChange}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Right Section */}
//               <div className="md:col-span-1">
//                 <FormField
//                   control={form.control}
//                   name="thumbnail"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel className="text-lg font-medium font-poppins text-black leading-[120%] tracking-[0%] ">
//                         Image
//                       </FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           {!previewImage ? (
//                             <div
//                               className={`
//                                   h-[310px] border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
//                                   ${
//                                     isDragOver
//                                       ? "border-blue-400 bg-blue-50"
//                                       : "border-gray-300 hover:border-gray-400"
//                                   }
//                                 `}
//                               onDrop={handleDrop}
//                               onDragOver={handleDragOver}
//                               onDragLeave={handleDragLeave}
//                               onClick={() =>
//                                 document.getElementById("image-upload")?.click()
//                               }
//                             >
//                               <div className="h-full flex flex-col items-center justify-center space-y-3">
//                                 <div className="">
//                                   <ImagePlus className="w-[38px] h-[38px] text-gray-400 " />
//                                 </div>
//                               </div>
//                               <input
//                                 id="image-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={(e) => {
//                                   const file = e.target.files?.[0];
//                                   if (file) {
//                                     handleImageChange(file);
//                                   }
//                                 }}
//                               />
//                             </div>
//                           ) : (
//                             <div className="relative">
//                               <Image
//                                 width={292}
//                                 height={277}
//                                 src={previewImage || "/placeholder.svg"}
//                                 alt="Preview"
//                                 className="w-full h-[310px] object-cover rounded-lg border-2 border-dashed border-gray-300"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   setPreviewImage(null);
//                                   form.setValue("thumbnail", undefined);
//                                 }}
//                                 className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
//                               >
//                                 <X className="h-4 w-4 text-gray-600" />
//                               </button>
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   document
//                                     .getElementById("image-upload")
//                                     ?.click()
//                                 }
//                                 className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
//                               >
//                                 <Upload className="h-4 w-4 text-gray-600" />
//                               </button>
//                               <input
//                                 id="image-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={(e) => {
//                                   const file = e.target.files?.[0];
//                                   if (file) {
//                                     handleImageChange(file);
//                                   }
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             <Button type="submit" className="mt-5">
//               Submit
//             </Button>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddServiceForm;
