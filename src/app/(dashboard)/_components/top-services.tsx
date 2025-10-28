"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export interface DashboardStatsResponse {
  success: boolean;
  message: string;
  data: {
    totalUsers: number;
    totalServices: number;
    totalBookings: number;
    totalRevenue: number;
    topServices: TopService[];
  };
}

export interface TopService {
  totalPayment: number;
  bookingCount: number;
  serviceId: string;
  title: string;
}

const COLORS = ["#FF557A", "#C79B0C", "#2A9D90"];

export function TopServices() {
  const { data, isLoading, isError, error } = useQuery<DashboardStatsResponse>({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/static-data`
      );
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{(error as Error).message}</h1>;

  // Safely map dynamic data for the chart
  const chartData =
    data?.data?.topServices?.map((item, index) => ({
      name: item.title,
      value: item.totalPayment, // Recharts expects "value"
      color: COLORS[index % COLORS.length],
    })) || [];

  const totalRevenue = data?.data?.totalRevenue || 0;

  return (
    <Card className="bg-[#EDE7F8] rounded-[8px]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-[#131313] leading-[120%]">
            Top 3 Services
          </CardTitle>
          <Link href="/dashboard/services">
             <button className="text-base text-[#4D0EB9] bg-[#C8B4E9] py-2 px-4 rounded-[8px] font-bold hover:underline">
              See all
            </button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-center">
          <div className="relative w-[358px] h-[358px]">
            <ResponsiveContainer width={358} height={358}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={120}
                  outerRadius={160}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base text-[#131313] font-semibold leading-[120%]">
                Total Done Services
              </span>
              <span className="text-2xl md:text-3xl font-bold text-[#131313] leading-[120%]">
                {totalRevenue}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
