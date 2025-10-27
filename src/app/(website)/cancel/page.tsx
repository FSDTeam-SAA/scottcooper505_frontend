import Link from "next/link";
import React from "react";

const CancelPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center text-black">
        Booking Cancelled
      </h2>
      <div className="mt-10">
        <Link href="/">
          <button className="bg-[#4D0EB9] text-white text-lg font-medium py-4 px-10 rounded-[10px]">
            Go To Home page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
