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
import { cn } from "@/lib/utils";
import { useSettingsStore } from "@/zustand/settingsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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
  address: z.string()
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
  const [date, setDate] = useState<Date | undefined>();
  const queryClient = useQueryClient();
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

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

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: (data: formValue) => {
      const updateData = {
        name: data.name,
        phone: data.phoneNumber,
        gender: data.gender,
        address: data.address,
        dob: date?.toISOString(), // Convert Date to ISO string for API
      };
      return updateUserProfile(updateData);
    },
    onSuccess: () => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });

      toast.success("Profile updated successfully!");
      setShowSubmit(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const updateUserProfile = async (userData: {
    name: string;
    phone: string;
    gender: string;
    dob?: string;
    address: string;
  }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile");
    }

    return response.json();
  };

  useEffect(() => {
    if (profileInfo) {
      // Parse birthDate from profileInfo
      const birthDate = profileInfo.birthDate
        ? new Date(profileInfo.birthDate)
        : undefined;
      setDate(birthDate);

      form.reset({
        name: profileInfo?.name || "",
        gender: profileInfo?.gender || "male",
        birthDate: profileInfo?.birthDate || "",
        address: profileInfo?.address || "",
        phoneNumber: profileInfo?.phoneNumber || "",
      });
    }
  }, [form, profileInfo]);

  const onSubmit = (value: formValue) => {
    toast.promise(updateUserMutation.mutateAsync(value), {
      loading: "Updating profile...",
      success: "Profile updated successfully!",
      error: (error) => error.message || "Failed to update profile",
    });
  };

  const handleCancel = () => {
    if (profileInfo) {
      const birthDate = profileInfo.birthDate
        ? new Date(profileInfo.birthDate)
        : undefined;
      setDate(birthDate);

      form.reset({
        name: profileInfo?.name || "",
        gender: profileInfo?.gender || "male",
        birthDate: profileInfo?.birthDate || "",
        address: profileInfo?.address || "",
        phoneNumber: profileInfo?.phoneNumber || "",
      });
    }
    setShowSubmit(false);
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
                      <Input
                        {...field}
                        disabled={showSubmit === false}
                        placeholder="Enter your full name"
                      />
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
                      <Input
                        {...field}
                        disabled={showSubmit === false}
                        placeholder="Enter your phone number"
                      />
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
                      <PopoverTrigger
                        disabled={showSubmit === false}
                        className="disabled:cursor-not-allowed"
                        asChild
                      >
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
                      <Input
                        disabled={showSubmit === false}
                        placeholder="Enter your address"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {showSubmit && (
            <div className="flex items-center justify-end mt-8">
              <div className="flex items-center space-x-5">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCancel}
                  disabled={updateUserMutation.isPending}
                >
                  <X className="w-4 h-4 mr-2" /> Cancel
                </Button>
                <Button type="submit" disabled={updateUserMutation.isPending}>
                  {updateUserMutation.isPending ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
