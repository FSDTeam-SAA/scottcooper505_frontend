"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import React, { useState } from "react";
import BookingsTable from "./bookings-table";

export const BookingHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <div>
        <PathTracker />
      </div>

      <div>
        <div className="pb-2">
          <BookingsTable />
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
