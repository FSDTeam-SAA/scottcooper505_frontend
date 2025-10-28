"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export interface BookingsResponse {
  status: boolean;
  message: string;
  data: {
    bookings: Booking[];
    pagination: Pagination;
  };
}

export interface Booking {
  _id: string;
  user: string;
  service: ServiceInfo;
  totalAmount: number;
  bookingStatus: "pending" | "confirmed" | "cancelled" | string;
  paymentIntentId: string;
  createdAt: string; // ISO timestamp
}

export interface ServiceInfo {
  title: string;
  price: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalBookings: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function BookingHistory() {
  const { data, isLoading, isError, error } = useQuery<BookingsResponse>({
    queryKey: ["booking-history"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/booking-history?page=1&limit=5`
      ).then((res) => res.json()),
  });

  console.log(data?.data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      <Card className="bg-[#EDE7F8] rounded-[8px] px-6 pb-[10px]">
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-[#131313] leading-[120%]">
              Top 5 Booking History
            </CardTitle>
            <Link href="/dashboard/booking-history">
              <button className="text-base text-[#4D0EB9] bg-[#C8B4E9] py-2 px-4 rounded-[8px] font-bold hover:underline">
                See all
              </button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className=" bg-white rounded-[8px] p-6">
          <Table>
            <TableHeader>
              <TableRow className="border border-[#B6B6B6]">
                <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                  Service Name
                </TableHead>
                <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                  Price
                </TableHead>
                <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                  User
                </TableHead>
                <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                  Date
                </TableHead>
                <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border border-[#B6B6B6]">
              {data?.data?.bookings && data.data.bookings?.length > 0 ? (
                data.data.bookings?.map((booking) => (
                  <TableRow
                    key={booking._id}
                    className="border border-[#B6B6B6]"
                  >
                    <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                      {booking.service?.title || "N/A"}
                    </TableCell>
                    <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                      {booking.totalAmount || "N/A"}
                    </TableCell>
                    <TableCell className="text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                      {booking.user || "N/A"}
                    </TableCell>
                    <TableCell className="text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                      {booking.createdAt
                        ? moment(booking.createdAt).format("MMM DD, YYYY")
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                      <button className="bg-[#008000] text-[#F4F4F4] text-sm font-medium py-[5px] px-[15px] rounded-full">
                        {booking.bookingStatus || "N/A"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-2xl font-semibold text-black py-6"
                  >
                    No bookings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
