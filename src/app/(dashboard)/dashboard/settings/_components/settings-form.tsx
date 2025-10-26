"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { cn } from "@/lib/utils"; // You might need to import this utility
import { useSettingsStore } from "@/zustand/settingsStore";

enum Gender {
  Male = "male",
  Female = "female",
}

interface ProfileType {
  name: string;
  email: string;
  gender: Gender;
  phoneNumber: string;
  birthDate: string;
  address: string;
  profileImage: string;
}

interface Props {
  profileInfo: ProfileType;
}

const formSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  gender: z.enum(["male", "female"]),
  birthDate: z.string(),
  address: z.string(),
});

type formValue = z.infer<typeof formSchema>;

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export const SettingsForm = ({ profileInfo }: Props) => {
  const [open, setOpen] = useState(false);
  const { showSubmit, setShowSubmit } = useSettingsStore();
  const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"));

  const form = useForm<formValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      gender: "male",
      birthDate: "",
      address: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: profileInfo?.name || "",
      gender: profileInfo?.gender || "",
      birthDate: profileInfo?.birthDate || "",
      address: profileInfo?.address || "",
      phoneNumber: profileInfo?.phoneNumber || "",
    });
  }, [form, profileInfo]);

  const onSubmit = (value: formValue) => {
    console.log("value: ", value);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            {/* fullname field */}
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={showSubmit === false} placeholder="Enter your full name" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="lg:flex items-center w-full gap-8 mt-8">
            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={showSubmit === false} placeholder="Enter your phone number" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={showSubmit === false}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="lg:flex items-center w-full gap-8 mt-8">
            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger disabled={showSubmit === false} className="disabled:cursor-not-allowed" asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-inherit mt-1",
                              !date && "text-muted-foreground"
                            )}
                          >
                            {date ? formatDate(date) : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            field.onChange(selectedDate?.toISOString());
                            setOpen(false);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:w-1/2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input disabled={showSubmit === false} placeholder="Enter your address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {showSubmit && (
            <div className="flex items-center justify-end mt-8">
              <div className="space-x-5">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowSubmit(false)}
                >
                  <X /> Cancel
                </Button>
                <Button type="submit">
                  <Save /> Save
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
