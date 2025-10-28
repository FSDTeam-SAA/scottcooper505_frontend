"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";

export interface DashboardStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalUsers: number;
    totalServices: number;
    totalBookings: number;
    totalRevenue: number;
    topServices: TopService[];
  };
}

export interface TopService {
  totalPayment: number;
  bookingCount: number;
  serviceId: string;
  title: string;
}


export function StatCards() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
const {data, isLoading, isError, error} = useQuery<DashboardStatsResponse>({
  queryKey: ["dashboard-overview"],
  queryFn: async () =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/static-data`,{
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  }
})

console.log(data)
if(isLoading) return <h1>Loading...</h1>
if(isError) return <h1>{error.message}</h1>
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="col-span-1 bg-[#EDE7F8] rounded-[8px] p-3">
        <h4 className="text-base font-bold text-[#131313] leading-[120%] pb-3 md:pb-4">
          Total Revenue
        </h4>
        <div className="flex items-center justify-between bg-white rounded-[6px] p-4 ">
          <span>
            <h3 className="text-xl md:text-2xl font-semibold text-[#131313] leading-[120%]">
              ${data?.data?.totalRevenue || 0}
            </h3>
            <p className="flex items-center gap-1 text-base font-normal text-[#424242] pt-2">
              <Image
                src="/assets/images/overview-icon.png"
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover w-6 h-6"
              />{" "}
              3.5% in this Month
            </p>
          </span>
          <span>
            <Image
              src="/assets/images/revenue-icon.png"
              alt="img.png"
              width={1000}
              height={1000}
              className="w-[96px] h-[34px] object-cover"
            />
          </span>
        </div>
      </div>
      <div className="col-span-1 bg-[#EDE7F8] rounded-[8px] p-3">
        <h4 className="text-base font-bold text-[#131313] leading-[120%] pb-3 md:pb-4">
          Total Services
        </h4>
        <div className="flex items-center justify-between bg-white rounded-[6px] p-4 ">
          <span>
            <h3 className="text-xl md:text-2xl font-semibold text-[#131313] leading-[120%]">
              {data?.data?.totalServices || 0}
            </h3>
            <p className="flex items-center gap-1 text-base font-normal text-[#424242] pt-2">
              <Image
                src="/assets/images/overview-icon.png"
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover w-6 h-6"
              />{" "}
              This month
            </p>
          </span>
          <span>
            <Image
              src="/assets/images/service-icon.png"
              alt="img.png"
              width={1000}
              height={1000}
              className="w-[96px] h-[34px] object-cover"
            />
          </span>
        </div>
      </div>
      <div className="col-span-1 bg-[#EDE7F8] rounded-[8px] p-3">
        <h4 className="text-base font-bold text-[#131313] leading-[120%] pb-3 md:pb-4">
          Total User
        </h4>
        <div className="flex items-center justify-between bg-white rounded-[6px] p-4 ">
          <span>
            <h3 className="text-xl md:text-2xl font-semibold text-[#131313] leading-[120%]">
              {data?.data?.totalUsers || 0}
            </h3>
            <p className="flex items-center gap-1 text-base font-normal text-[#424242] pt-2">
              <Image
                src="/assets/images/overview-icon.png"
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover w-6 h-6"
              />{" "}
              3.5% in this Month
            </p>
          </span>
          <span>
            <Image
              src="/assets/images/user-icon.png"
              alt="img.png"
              width={1000}
              height={1000}
              className="w-[96px] h-[34px] object-cover"
            />
          </span>
        </div>
      </div>
      <div className="col-span-1 bg-[#EDE7F8] rounded-[8px] p-3">
        <h4 className="text-base font-bold text-[#131313] leading-[120%] pb-3 md:pb-4">
          Total Booking
        </h4>
        <div className="flex items-center justify-between bg-white rounded-[6px] p-4 ">
          <span>
            <h3 className="text-xl md:text-2xl font-semibold text-[#131313] leading-[120%]">
              {data?.data?.totalBookings || 0}
            </h3>
            <p className="flex items-center gap-1 text-base font-normal text-[#424242] pt-2">
              <Image
                src="/assets/images/overview-icon.png"
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover w-6 h-6"
              />{" "}
              3.5% in this Month
            </p>
          </span>
          <span>
            <Image
              src="/assets/images/booking-icon.png"
              alt="img.png"
              width={1000}
              height={1000}
              className="w-[96px] h-[34px] object-cover"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
