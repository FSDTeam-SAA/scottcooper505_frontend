"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  currentPassword: z.string().min(2, {
    message: "currentPassword must be at least 2 characters.",
  }),
  newPassword: z.string().min(2, {
    message: "newPassword must be at least 2 characters.",
  }),
  confirmPassword: z.string().min(2, {
    message: "confirmPassword must be at least 2 characters.",
  }),
});

const ChangePasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="h-screen container mx-auto pt-48">
      <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-[#131313] leading-[120%] text-center">
        Change Password
      </h2>
      <div className="pt-6 md:pt-7 lg:pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                      placeholder="#############"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
<FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                      placeholder="#############"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                      placeholder="#############"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            </div>

            <Button
              className="w-full h-[48px] text-base text-white leading-[120%] font-bold bg-[#4D0EB9] rounded-[8px]"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
