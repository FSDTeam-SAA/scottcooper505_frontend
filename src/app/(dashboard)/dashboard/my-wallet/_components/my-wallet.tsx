"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import React, { useState } from "react";
import WalletTable from "./wallet-table";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const MyWallet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data: allWallet = {} } = useQuery({
    queryKey: ["all-wallet", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/my-wallet?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      return data?.data;
    },
    enabled: !!token,
  });


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
            <h1 className="text-xl font-bold">${allWallet?.totalRevenue}</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="pb-2">
          <WalletTable allWallet={allWallet} />
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
