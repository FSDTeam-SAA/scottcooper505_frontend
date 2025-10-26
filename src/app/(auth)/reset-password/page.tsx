import React, { Suspense } from "react";
import ResetPasswordForm from "../_component/reset-password-form";

const page = () => {
  return (
    <div className="container lg:max-w-5xl py-16 lg:py-0">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default page;
