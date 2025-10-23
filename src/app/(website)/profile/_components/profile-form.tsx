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
  fullName: z.string().min(2, {
    message: "fullName must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
    phoneNumber: z.string().min(2, {
    message: "phoneNumber must be at least 2 characters.",
  }),
    city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
    country: z.string().min(2, {
    message: "country must be at least 2 characters.",
  }),
});

const ProfileInfo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      city: "",
      country: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <div>
        <h2 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-[#131313] leading-[120%]">
          Profile Setting
        </h2>
        <div className="pt-6 md:pt-7 lg:pt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                        placeholder="Bessie"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                        placeholder="lawson@example.com"
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                          placeholder="0000000000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                        City/State
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                          placeholder="Miami"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
                  <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base md:text-lg font-medium text-[#131313] leading-[120%]">
                     Country
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-[56px] border border-[#645949] rounded-[8px] text-base md:text-lg font-normal text-[#616161] leading-[120%]"
                        placeholder="USA"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

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
    </div>
  );
};

export default ProfileInfo;
