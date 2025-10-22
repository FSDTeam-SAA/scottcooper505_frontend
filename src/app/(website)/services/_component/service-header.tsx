import React from "react";

export const ServiceHeader = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/service-header.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay",
      }}
      className="min-h-[500px] bg-[#00000098] flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">Our Services</h1>
        <p className="text-white/85 lg:max-w-lg mx-auto mt-2">
          Comprehensive construction solutions for residential and commercial
          properties in north-west Tennessee and surrounding areas.
        </p>
      </div>
    </div>
  );
};
