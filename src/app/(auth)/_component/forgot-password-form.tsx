'use client'
import React from "react";
import Logo from "./logo";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.input<typeof formSchema>;

const ForgotPasswordForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("values: ", values);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-10 justify-between items-center w-full">
        <Logo />

        <div className="w-full lg:w-1/2 shadow-lg p-5 rounded-lg">
          <div className="mb-5">
            <h1 className="text-4xl font-medium mb-2">Forgot Password</h1>
            <p className="text-gray-600 text-sm">
              Enter your registered email address. we’ll send you a code to
              reset your password.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Login Button */}
              <Button
                type="submit"
                // disabled={isLoading}
                className="w-full text-white font-semibold py-2 h-auto"
              >
                Send OTP
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
