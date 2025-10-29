"use client";

import { z } from "zod";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Please rate us!" }),
  comment: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500),
});

type FormValues = z.infer<typeof formSchema>;

export default function ShareExperienceForm() {
const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  // console.log(serviceId)

const session = useSession();
const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["share-your-exprience"],
    mutationFn: (values: FormValues) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Review submitted successfully!");
      router.push("/");
    },
  });

  const onSubmit = (values: FormValues) => {
    // console.log("Submitted Data:", values);
    const payload = {
      rating: values.rating,
      comment: values.comment,
      service: serviceId
    }
    mutate(payload);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Rate Us";
    }
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_#00000029] mt-6">
      <div className="w-full bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-between py-5 md:py-[25px] lg:py-[29px] px-6 md:px-7 lg:px-8 rounded-t-[12px]">
        <h4 className="text-lg font-medium text-[#282828] leading-[120%]">
          Ratings and Reviews
        </h4>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-6 pt-10"
          >
            {/* Rating Field */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex items-center gap-6">
                  <FormLabel className="text-base font-medium text-[#333333] leading-[120%] mt-2">
                    Rate Us
                  </FormLabel>
                  <FormControl className="">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isActive = star <= field.value;
                        return (
                          <button
                            type="button"
                            key={star}
                            onClick={() => field.onChange(star)}
                            className="transition-colors duration-150"
                          >
                            <Star
                              className={`h-6 w-6 ${isActive
                                ? "fill-[#FACC15] text-[#FACC15]"
                                : "text-[#FACC15] hover:text-[#FACC15]/90"
                                }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {getRatingText(field.value)}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium text-[#333333] leading-[120%]">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience..."
                      className="h-[142px] resize-none border border-[#282828]"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    {field.value.length}/200 characters
                  </p>{" "}
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center pt-1">
              <Button
                disabled={isPending}
                className="my-5 h-[51px] bg-[#4D0EB9] rounded-full text-[#F4F4F4] text-base font-medium leading-[120%] py-4 px-[47px]"
                type="submit"
              >
                {isPending ? "Saving...." : "Submit Review"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
