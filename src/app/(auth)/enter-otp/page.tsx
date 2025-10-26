import React, { Suspense } from "react";
import EnterOtpForm from "../_component/enter-otp-form";

const page = () => {
  return (
    <div className="container lg:max-w-5xl py-16 lg:py-0">
      <Suspense fallback={<div>Loading...</div>}>
        <EnterOtpForm />  
      </Suspense>
    </div>
  );
};

export default page;
