"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const ServiceDetails = () => {
  const { id } = useParams();

  const { data: serviceDetails = {}, isLoading } = useQuery({
    queryKey: ["service-details", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service/${id}`,
        { method: "GET" }
      );
      const data = await res.json();
      return data?.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container flex flex-col lg:flex-row items-start gap-16">
        <div className="lg:w-[45%] overflow-hidden rounded-lg">
          <Skeleton className="w-full h-[300px] md:h-[500px] lg:h-[700px] rounded-lg" />
        </div>

        <div className="lg:w-[55%] space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-10 w-full mt-5" />
        </div>
      </div>
    );
  }

  return (
    <div className="container flex flex-col lg:flex-row items-start gap-16">
      <div className="lg:w-[45%] overflow-hidden rounded-lg">
        <Image
          src={serviceDetails?.thumbnail || ""}
          alt={serviceDetails?.title || "Service image"}
          height={1000}
          width={1000}
          className="object-cover lg:h-[700px] rounded-lg shadow-xl cursor-pointer hover:scale-125 transition-all duration-300"
        />
      </div>

      <div className="lg:w-[55%]">
        <div
          className="text-[#4A484E] leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: serviceDetails?.description || "",
          }}
        />

        <div>
          <Link href={"/booking"}>
            <Button className="w-full mt-5">
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
