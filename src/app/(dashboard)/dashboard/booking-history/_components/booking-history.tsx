"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import BookingsTable from "./bookings-table";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import { useState } from "react";

export const BookingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data: history = {} } = useQuery({
    queryKey: ["all-history"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/booking-history`,
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

  const allHistory = history?.bookings;
  const pagination = allHistory?.pagination;

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
        {(pagination?.totalPages ?? 0) > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base font-medium text-[#3F3F3F]">
              Showing page {pagination?.currentPage ?? currentPage} of{" "}
              {pagination?.totalPages ?? 0} ({pagination?.totalData ?? 0}{" "}
              results)
            </p>

            <div>
              <ScottcooperPagination
                totalPages={pagination?.totalPages ?? 0}
                currentPage={pagination?.currentPage ?? currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
