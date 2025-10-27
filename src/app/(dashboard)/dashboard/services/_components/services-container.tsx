"use client";

import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import { Button } from "@/components/ui/button";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import DeleteModal from "@/components/modal/DeleteModal";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export interface ServiceResponse {
  status: boolean;
  message: string;
  data: {
    services: Service[];
    pagination: Pagination;
  };
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  duration: string;
  start_time?: string; // optional (not all services have it)
  end_time?: string; // optional
  date?: string; // optional
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  timeSlots?: TimeSlot[]; // optional (some have it)
  schedule: Schedule[];
}

export interface TimeSlot {
  start_time: string;
  end_time: string;
  duration: string;
}

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

const ServicesContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState<string>("");
  const queryClient = useQueryClient();
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data, isLoading, isError, error } = useQuery<ServiceResponse>({
    queryKey: ["services", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/get-all-services?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return res.json();
    },
  });

  console.log(data?.data?.services);

  // delete api logic
  const { mutate: deleteUser } = useMutation({
    mutationKey: ["delete-service"],
    mutationFn: (id: string) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Failed to delete service");
        return;
      } else {
        toast.success(data?.message || "Services deleted successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  // delete modal logic
  const handleDelete = () => {
    if (serviceId) {
      deleteUser(serviceId);
    }
    setDeleteModalOpen(false);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between  p-5">
        <PathTracker />

        <Link href={"/dashboard/services/add-service"}>
          <Button>
            <Plus /> Add Resource
          </Button>
        </Link>
      </div>
      <div className="pt-6 md:pt-7 lg:pt-8">
        <Table>
          <TableHeader>
            <TableRow className="border border-[#B6B6B6]">
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                service Name
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Price
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
            {data?.data?.services?.map((service) => {
              return (
                <TableRow
                  key={service?._id}
                  className="border border-[#B6B6B6] "
                >
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {service.title || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {service.price || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                    {service.createdAt
                      ? moment(service.createdAt).format("MMM DD, YYYY")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2 text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                    <Link href={`/dashboard/services/edit-service/${service?._id}`}>
                    <SquarePen className="w-5 h-5 cursor-pointer" />
                    </Link>
                    <button
                      onClick={() => {
                        setServiceId(service?._id);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="w-5 h-5 cursor-pointer" />
                    </button>
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
            data?.data?.pagination &&
            data?.data?.pagination?.totalPages > 1 && (
              <div className="bg-transparent flex items-center justify-between pt-4 md:pt-6 lg:pt-8">
                <p className="text-sm md:text-base font-medium leading-[120%]  text-[#3F3F3F]">
                  Showing {currentPage}
                  of {data?.data?.pagination?.totalPages} results
                </p>
                <div>
                  <ScottcooperPagination
                    totalPages={data?.data?.pagination?.totalPages || 0}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

      <div>
        {/* delete modal  */}
        {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ServicesContainer;
