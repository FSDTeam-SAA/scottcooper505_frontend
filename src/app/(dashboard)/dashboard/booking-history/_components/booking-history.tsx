"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import React, { useState } from "react";
import BookingsTable from "./bookings-table";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

export const BookingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

   const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data: allHistory = {} } = useQuery({
    queryKey: ["all-history", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/booking-history?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      return data?.data;
    },
    enabled: !!token,
  });

  console.log("allHistory: ", allHistory)

  return (
    <div className="space-y-6">
      <div>
        <PathTracker />
      </div>

      <div>
        <div className="pb-2">
          <BookingsTable allHistory={allHistory} />
        </div>

        {/* pagination here  */}
        <div className="bg-transparent flex items-center justify-between p-4 bg-white">
          <p className="text-sm md:text-base font-medium leading-[120%]  text-[#3F3F3F]">
            Showing {currentPage}
            of 259 results
          </p>
          <div>
            <ScottcooperPagination
              totalPages={3}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
