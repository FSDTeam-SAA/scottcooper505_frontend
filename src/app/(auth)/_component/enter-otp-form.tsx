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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type FormValues = z.input<typeof formSchema>;

const EnterOtpForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const decodedEmail = decodeURIComponent(email || "");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });



  // otp api integration
  const { mutate, isPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: (values: { otp: string; email: string }) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-code`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      } else {
        toast.success(data?.message || "Email sent successfully!");
        router.push(
          `/reset-password?email=${encodeURIComponent(decodedEmail)}`
        );
      }
    },
  });

  // reset otp api integrattion
  const { mutate: resentOtp, isPending: resentOtpPending } = useMutation({
    mutationKey: ["fotgot-password"],
    mutationFn: (email: string) =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      ).then((res) => res.json()),
    onSuccess: (data, email) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      } else {
        toast.success(data?.message || "Email sent successfully!");
        router.push(`/enter-otp?email=${encodeURIComponent(email)}`);
      }
    },
  });


  const onSubmit = (values: FormValues) => {
    const payload = {
      otp: values.otp,
      email: decodedEmail,
    };
    mutate(payload);
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
                Verify {isPending && <Loader2 className="animate-spin" />}
              </Button>

              {/* Resend OTP Option */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Didn&apos;t receive the code?{" "}
                  <button
                    type="button"
                    className="text-primary font-medium"
                    onClick={() => {
                      resentOtp(decodedEmail);
                    }}
                  >
                    Resend OTP {resentOtpPending && "..." }
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

