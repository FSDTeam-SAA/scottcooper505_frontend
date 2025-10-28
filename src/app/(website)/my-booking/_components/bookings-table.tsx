"use client";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
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
import { useState } from "react";

interface Booking {
  _id: string;
  user: string;
  serviceId: {
    title: string;
    price: number;
  };
  totalAmount: number;
  bookingStatus: string;
  paymentIntentId: string;
  createdAt: string;
  address?: string;
}

export const BookingsTable = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookings = {} } = useQuery({
    queryKey: ["all-history"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/my-bookings`,
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

  const allHistory = bookings?.bookings;
  const pagination = allHistory?.pagination;

  return (
    <div>
      <Table>
        <TableHeader className="border-b border-t border-gray-300">
          <TableRow>
            <TableHead className="text-center text-black font-semibold">
              Service Name
            </TableHead>
            <TableHead className="text-center text-black font-semibold">
              Price
            </TableHead>
            <TableHead className="text-center text-black font-semibold">
              Date
            </TableHead>
            <TableHead className="text-center text-black font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-center">
          {allHistory?.length > 0 ? (
            allHistory.map((booking: Booking) => (
              <TableRow key={booking?._id} className="border-b border-gray-300">
                <TableCell>{booking?.serviceId?.title || "N/A"}</TableCell>
                <TableCell>${booking?.serviceId?.price?.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(booking?.createdAt).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>

                <TableCell>
                  <button className="py-1 px-5 rounded-3xl bg-[#058001] text-white font-bold">
                    {booking?.bookingStatus}
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-gray-500 py-4">
                No booking history found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-8">
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
