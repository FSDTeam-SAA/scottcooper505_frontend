"use client";
import { ArrowRight } from "lucide-react";
import ServiceCard from "./service-card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface Service {
  _id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
}

const OurService = () => {
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

  return (
    <div className="container">
      <div className="flex items-center justify-between gap-8 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Our Services</h1>
          <p className="lg:max-w-xl text-sm text-black/75 mt-1">
            Comprehensive construction solutions for residential properties in
            the North-West Tennessee and surrounding areas.
          </p>
        </div>

        <div>
          <Link href={"/services"}>
            <button className="text-primary font-bold flex items-center gap-2 w-[105px]">
              See More <ArrowRight />
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isLoading
          ? [...Array(3)].map((_, i) => (
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
          : services
              ?.slice(0, 3)
              ?.map((service: Service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
      </div>
    </div>
  );
};

export default OurService;
