"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  return (
    <div>
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
                Address
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Date
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody className="border border-[#B6B6B6]">
            {data?.data?.users && data.data.users.length > 0 ? (
              data.data.users.map((user) => (
                <TableRow key={user._id} className="border border-[#B6B6B6]">
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {user.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {user.email || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                    {user.phone || "N/A"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-2xl font-semibold text-black py-6"
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
        </Table>
    </div>
  )
}
