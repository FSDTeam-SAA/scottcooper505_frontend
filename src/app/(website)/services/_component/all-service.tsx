import ServiceCard from "@/components/home/service-card";
import React from "react";

export const AllService = () => {
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
    {
      _id: 4,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
    {
      _id: 5,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
    {
      _id: 6,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
    {
      _id: 7,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
    {
      _id: 8,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
    {
      _id: 9,
      serviceImg: "/service-img.jpg",
      title: "Residential Construction",
      desc: "Building homes with quality, care, and precision.",
    },
  ];

  return (
    <div className="container mt-16 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {serviceInfo.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};
