"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import React, { useState } from "react";
import WalletTable from "./wallet-table";

const MyWallet = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <div>
        <PathTracker />
      </div>

      <div>
        <div className="bg-primary/15 w-[250px] p-5 rounded-lg">
          <h1 className="text-md">Total Revenue</h1>

          <div className="mt-1 flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <h1 className="text-xl font-bold">$132,570.00</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="pb-2">
          <WalletTable />
        </div>

        {/* pagination here  */}
        <div className="bg-transparent flex items-center justify-between p-4 bg-white">
          <p className="text-sm md:text-base font-medium leading-[120%]  text-[#3F3F3F]">
            Showing {currentPage}
            of 259 results
          </p>
          <div>
            <ScottcooperPagination
              totalPages={3}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
