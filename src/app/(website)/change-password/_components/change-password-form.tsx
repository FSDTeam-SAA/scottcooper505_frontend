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
import { useSession } from "next-auth/react";
import { useChnagePassword } from "@/hooks/APiCalling";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

export const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Current password must be at least 6 characters." }),

    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." })
      .regex(/[A-Z]/, { message: "New password must contain at least one uppercase letter." })
      .regex(/[a-z]/, { message: "New password must contain at least one lowercase letter." })
      .regex(/[0-9]/, { message: "New password must contain at least one number." })
      .regex(/[^A-Za-z0-9]/, { message: "New password must contain at least one special character." }),

    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password must be at least 8 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ["newPassword"],
    message: "New password must be different from the current password.",
  });


const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { data: session } = useSession();
  const token = (session?.user as { accessToken: string })?.accessToken;
  const changePasswordMutation = useChnagePassword(token);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    changePasswordMutation.mutate({
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
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
                    <div className="relative">
                      <Input
                        type={currentPassword ? "text" : "password"}
                        className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                        placeholder="#############"
                        {...field}
                      />
                      <button
                      type="button"
                        onClick={() => setCurrentPassword(!currentPassword)}
                        className="absolute right-4 top-4"
                      >
                        {currentPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
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
                      <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                        placeholder="#############"
                        {...field}
                      />
                      <button
                      type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-4"
                      >
                        {showNewPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
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
                     <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                        placeholder="#############"
                        {...field}
                      />
                      <button
                      type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-4"
                      >
                        {showConfirmPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
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
              Save{" "}
              {changePasswordMutation.isPending && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
