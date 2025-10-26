"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Eye, Trash2 } from "lucide-react";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";

export interface UserApiResponse {
  status: boolean;
  message: string;
  data: {
    users: User[];
    paginationInfo: PaginationInfo;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string | null;
  dob?: string | null;
  gender?: "male" | "female" | "other" | "";
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  stripeAccountId?: string | null;
  bio: string;
  profileImage: string;
  multiProfileImage: string[];
  pdfFile: string;
  otp?: string | null;
  otpExpires?: string | null;
  otpVerified: boolean;
  resetExpires?: string | null;
  isVerified: boolean;
  refreshToken: string;
  hasActiveSubscription: boolean;
  subscriptionExpireDate?: string | null;
  blockedUsers: string[]; // could also be object[] if API later adds full user data
  language: string;
  address: Address;
}

export interface Address {
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const UserProfileContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = (session.data?.user as { accessToken: string })?.accessToken;
  const { data, isLoading, isError, error } = useQuery<UserApiResponse>({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/all-users?page=${currentPage}&limit=8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data);
  return (
    <div>
      <PathTracker />
      <div className="pt-6 md:pt-7 lg:pt-8">
        <Table>
          <TableHeader>
            <TableRow className="border border-[#B6B6B6]">
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Users Name
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Email
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Phone Number
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border border-[#B6B6B6]">
            {data?.data?.users?.map((user) => {
              return (
                <TableRow key={user?._id} className="border border-[#B6B6B6] ">
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {user.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {user.email || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                    {user.phone || "N/A"}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2 text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                    <Eye className="w-5 h-5 cursor-pointer" />
                    <Trash2 className="w-5 h-5 cursor-pointer" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* pagination here  */}
        <div>
          {data &&
            data?.data &&
            data?.data?.paginationInfo &&
            data?.data?.paginationInfo?.totalPages > 1 && (
              <div className="bg-transparent flex items-center justify-between pt-4 md:pt-6 lg:pt-8">
                <p className="text-sm md:text-base font-medium leading-[120%]  text-[#3F3F3F]">
                  Showing {currentPage}
                  of 259 results
                </p>
                <div>
                  <ScottcooperPagination
                    totalPages={data?.data?.paginationInfo?.totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileContainer;
