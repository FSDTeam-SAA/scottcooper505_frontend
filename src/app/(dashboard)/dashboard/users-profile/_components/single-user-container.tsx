"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export interface UserResponse {
  status: boolean;
  message: string;
  data: UserData;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dob: string | null;
  gender: "male" | "female" | "other" | string;
  role: "USER" | "ADMIN" | string;
  stripeAccountId: string | null;
  bio: string;
  profileImage: string;
  multiProfileImage: string[];
  pdfFile: string;
  otp: string | null;
  otpExpires: string | null;
  otpVerified: boolean;
  resetExpires: string | null;
  isVerified: boolean;
  refreshToken: string;
  hasActiveSubscription: boolean;
  subscriptionExpireDate: string | null;
  blockedUsers: string[];
  language: string;
  address: Address;
  createdAt: string;
}

export interface Address {
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
}

const SingleUserContainer = ({
  userId,
  open,
  onOpenChange,
}: {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const { data, isLoading, isError, error } = useQuery<UserResponse>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex items-center justify-between p-5  md:p-7  lg:p-10">
          <div className="space-y-4">
            <p>
              <span className="text-base font-medium text-black leading-[120%]">
                Name :
              </span>{" "}
              <br />{" "}
              <span className="text-xl md:text-2xl font-bold text-black leading-[120%]">
                {data?.data?.name || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-base font-medium text-black leading-[120%]">
                Country :
              </span>{" "}
              <br />{" "}
              <span className="text-xl md:text-2xl font-bold text-black leading-[120%]">
                {data?.data?.address?.country || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-base font-medium text-[#43A047] leading-[120%]">
                Email :
              </span>{" "}
              <br />{" "}
              <span className="text-xl md:text-2xl font-bold text-[#43A047] leading-[120%]">
                {data?.data?.email || "N/A"}
              </span>
            </p>
          </div>
          <div className="space-y-4">
            <p>
              <span className="text-base font-medium text-black leading-[120%]">
                Phone Number :
              </span>{" "}
              <br />{" "}
              <span className="text-xl md:text-2xl font-bold text-black leading-[120%]">
                {data?.data?.phone || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-base font-medium text-black leading-[120%]">
                Registration Date: :
              </span>{" "}
              <br />{" "}
              <span className="text-xl md:text-2xl font-bold text-black leading-[120%]">
                {data?.data?.createdAt || "N/A"}
              </span>
            </p>
            <p>
              <span className="text-base font-medium text-black leading-[120%]">
                State :
              </span>{" "}
              <br />{" "}
              <span className="text-xl md:text-2xl font-bold text-black leading-[120%]">
                {data?.data?.address?.cityState || "N/A"}
              </span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SingleUserContainer;
