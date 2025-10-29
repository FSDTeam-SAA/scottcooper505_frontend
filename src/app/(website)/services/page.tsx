import React from "react";
import { AllService } from "./_component/all-service";
import HeroSection from "@/components/common/Hero-Section";

const page = () => {
  return (
    <div className="mt-[100px]">
      <div>
        <HeroSection
          img="/service-header.jpg"
          title="Our Services"
          desc={
            <>
              Comprehensive construction solutions for residential properties{" "}
              <br /> in the North-West Tennessee and surrounding areas.
            </>
          }
        />

        <AllService />
      </div>
    </div>
  );
};

export default page;
