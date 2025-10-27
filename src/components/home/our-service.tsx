"use client";
import { ArrowRight } from "lucide-react";
import ServiceCard from "./service-card";
// import { useQuery } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";

const OurService = () => {
  // const session = useSession();
  // const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const serviceInfo = [
    {
      _id: 1,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
    {
      _id: 2,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
    {
      _id: 3,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
  ];

  // const {} = useQuery({
  //   queryKey: ["all-service"],
  //   queryFn: async () => {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  //   },
  // });

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
          <button className="text-primary font-bold flex items-center gap-2 w-[105px]">
            See More <ArrowRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {serviceInfo.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default OurService;
