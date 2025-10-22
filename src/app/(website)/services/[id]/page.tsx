import React from "react";
import ServiceDetails from "./_component/service-details";
import { Review } from "./_component/review";

const page = () => {
  //   const { id } = params;

  return (
    <div className="mt-32">
      <ServiceDetails />
      <Review />
    </div>
  );
};

export default page;
