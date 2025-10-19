"use client";
import React from "react";
import Logo from "./logo";
import { signUpSchema } from "@/schema/signUpSchema";
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
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const formSchema = signUpSchema;

type FormValues = z.input<typeof formSchema>;

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      termCondition: false,
    },
  });

  async function onSubmit(values: FormValues) {
    console.log("Form values:", values);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col lg:flex-row gap-10 justify-between items-center w-full">
        <Logo />

        <div className="lg:w-1/2 shadow-lg p-5 rounded-lg">
          <div className="mb-5">
            <h1 className="text-4xl font-medium mb-2">Create New Account</h1>
            <p>Please enter details</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email Field */}
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

              {/* phone number field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter confirm password"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termCondition"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>

                    <FormLabel className="font-normal">
                      I agree to the{" "}
                      <Link href={"/terms-condition"}>
                        <span className="font-semibold hover:underline hover:text-primary">
                          terms & condition
                        </span>
                      </Link>
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* sing up Button */}
              <Button
                type="submit"
                // disabled={isLoading}
                className="w-full text-white font-semibold py-2 h-auto"
              >
                Sign Up
              </Button>
            </form>
          </Form>

          {/* login Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-foreground font-semibold hover:underline hover:text-primary"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
