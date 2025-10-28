"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardOverviewSkeleton() {
  const stats = [1, 2, 3, 4]; // placeholder for 4 cards

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((_, index) => (
        <Card
          key={index}
          className="bg-muted/30 border border-border shadow-sm rounded-2xl"
        >
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24 mb-2" /> {/* title */}
            <Skeleton className="h-6 w-32" /> {/* number */}
          </CardHeader>

          <CardContent className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" /> {/* percentage text */}
            </div>
            <Skeleton className="h-10 w-20 rounded-md" /> {/* mini chart */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
