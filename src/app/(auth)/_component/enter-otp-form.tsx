"use client";
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
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type FormValues = z.input<typeof formSchema>;

const EnterOtpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("OTP values: ", values);
    // Handle OTP verification logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-10 justify-between items-center w-full">
        <Logo />

        <div className="w-full lg:w-1/2 shadow-lg p-5 rounded-lg">
          <div className="mb-5">
            <h1 className="text-4xl font-medium mb-2">Enter OTP</h1>
            <p className="text-gray-600 text-sm">
              We have sent a 6-digit code to your registered email address.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* OTP Field */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="flex w-full justify-between gap-2">
                          <InputOTPSlot
                            index={0}
                            className="w-14 h-14 text-lg font-semibold rounded-md border border-black/50"
                          />
                          <InputOTPSlot
                            index={1}
                            className="w-14 h-14 text-lg font-semibold rounded-md border border-black/50"
                          />
                          <InputOTPSlot
                            index={2}
                            className="w-14 h-14 text-lg font-semibold rounded-md border border-black/50"
                          />
                          <InputOTPSlot
                            index={3}
                            className="w-14 h-14 text-lg font-semibold rounded-md border border-black/50"
                          />
                          <InputOTPSlot
                            index={4}
                            className="w-14 h-14 text-lg font-semibold rounded-md border border-black/50"
                          />
                          <InputOTPSlot
                            index={5}
                            className="w-14 h-14 text-lg font-semibold rounded-md border border-black/50"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full text-white font-semibold py-2 h-auto"
              >
                Verify
              </Button>

              {/* Resend OTP Option */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    className="text-primary font-medium"
                    onClick={() => {
                      // Add resend OTP logic here
                      console.log("Resend OTP clicked");
                    }}
                  >
                    Resend OTP
                  </button>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EnterOtpForm;
