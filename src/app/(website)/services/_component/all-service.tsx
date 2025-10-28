"use client";
import ServiceCard from "@/components/home/service-card";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

interface Service {
  _id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
}

export const AllService = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allServices, isLoading } = useQuery({
    queryKey: ["all-service"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/get-all-services`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      return data?.data;
    },
  });

  const services = allServices?.services || [];
  const pagination = allServices?.pagination;

  return (
    <div className="container mt-16 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-5 rounded-lg shadow-[0px_0px_60px_0px_#0000003D]"
              >
                <Skeleton className="w-[400px] h-[255px] rounded-lg" />
                <Skeleton className="mt-3 h-5 w-1/2" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-5/6" />
                <div className="flex items-center justify-between mt-4">
                  <Skeleton className="h-10 w-[120px]" />
                  <Skeleton className="h-10 w-[120px]" />
                </div>
              </div>
            ))
          : services.map((service: Service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
      </div>

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
