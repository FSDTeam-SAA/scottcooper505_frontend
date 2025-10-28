import Link from "next/link";
import React from "react";
import ShareExperienceForm from "./_components/share-your-exprience-form";

const SuccessPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black pt-5 md:pt-7 lg:pt-10">
        Payment Successfully
      </h2>

      <div className="w-full md:w-[600px]">
        <ShareExperienceForm/>
      </div>
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

export default SuccessPage;
