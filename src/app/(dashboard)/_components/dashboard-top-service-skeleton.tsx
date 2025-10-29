"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardTopServicesSkeleton() {
  return (
    <Card className="p-4 bg-[#F4F0FB] rounded-xl flex flex-col items-center justify-center w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="w-full mb-4">
        <Skeleton className="h-4 w-28 rounded-md" /> {/* "Top 3 Services" */}
      </div>

      {/* Donut Chart Placeholder */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-4">
        <div className="absolute inset-0 rounded-full border-[10px] border-slate-200 animate-pulse"></div>
        <div className="absolute inset-4 rounded-full bg-white"></div>
        <Skeleton className="h-6 w-20 rounded-md absolute" /> {/* Total Done Services */}
      </div>

      {/* Total Value Placeholder */}
      <Skeleton className="h-5 w-24 mb-4 rounded-md" />

      {/* Legend Placeholder */}
      <div className="flex flex-col space-y-2 w-full">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-8 rounded-md ml-auto" />
          </div>
        ))}
      </div>
    </Card>
  );
}
