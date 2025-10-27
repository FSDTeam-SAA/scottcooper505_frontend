"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const ServiceDetails = () => {
  const serviceDetails = {
    _id: 1,
    serviceImg: "/service-img.jpg",
    title: "Residential Construction",
    desc: "Building homes with quality, care, and precision. Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.Building homes with quality, care, and precision.",
  };

  return (
    <div className="container flex flex-col lg:flex-row items-start gap-16">
      <div className="lg:w-[45%] overflow-hidden rounded-lg">
        <Image
          src={serviceDetails.serviceImg}
          alt="img.png"
          height={1000}
          width={1000}
          className="object-cover lg:h-[700px] rounded-lg shadow-xl cursor-pointer hover:scale-125 transition-all duration-300"
        />
      </div>

      <div className="lg:w-[55%]">
        <p>{serviceDetails.desc}</p>
        <div>
          <Button className="w-full mt-5">
            Book Now <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
