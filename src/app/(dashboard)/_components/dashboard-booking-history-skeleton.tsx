"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardBookingHistorySkeleton() {
  return (
    <div className="bg-[#EDE7F8] rounded-[8px] py-3 px-[14px]">
      <div className="flex items-center justify-between pb-3 md:pb-4">
        <h2 className="text-base font-bold text-[#131313] leading-[120%]">
          Booking History
        </h2>
        <Skeleton className="h-8 w-20 rounded-md" /> {/* See All Button */}
      </div>

      <Card className="bg-white rounded-[6px] p-4">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 border-b border-slate-200 pb-3 text-sm font-medium text-slate-600">
          <p>Service Name</p>
          <p>Price</p>
          <p>Address</p>
          <p>Date</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        <div className="mt-3 space-y-4">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 items-center border-b border-slate-100 pb-3 last:border-none"
            >
              <Skeleton className="h-4 w-32 rounded" /> {/* Service Name */}
              <Skeleton className="h-4 w-20 rounded" /> {/* Price */}
              <Skeleton className="h-4 w-48 rounded" /> {/* Address */}
              <Skeleton className="h-4 w-20 rounded" /> {/* Date */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" /> {/* Status */}
                <Skeleton className="h-4 w-4 rounded" /> {/* Dropdown Icon */}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
