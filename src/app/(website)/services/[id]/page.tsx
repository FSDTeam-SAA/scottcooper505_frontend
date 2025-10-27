import React from "react";
import ServiceDetails from "./_component/service-details";
import { Review } from "./_component/review";

const page = () => {

  return (
    <div className="mt-36">
      <ServiceDetails />
      <Review />
    </div>
  );
};

export default page;
