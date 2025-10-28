"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

type FilterType = "day" | "week" | "month" | "year";

interface RevenueData {
  success: boolean;
  message: string;
  data: {
    currentYear: {
      year: number;
      data: Array<{
        [key: string]: string | number;
        revenue: number;
        bookingCount: number;
      }>;
    };
    lastYear: {
      year: number;
      data: Array<{
        [key: string]: string | number;
        revenue: number;
        bookingCount: number;
      }>;
    };
    filterType: FilterType;
  };
}

interface RevenueDataPoint {
  [key: string]: string | number;
  revenue: number;
  bookingCount: number;
}

interface TransformedDataPoint {
  period: string;
  currentYear: number;
  lastYear: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export function formatCurrency(value: number): string {
  if (typeof value !== "number" || isNaN(value)) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function transformChartData(
  data: {
    currentYear: { year: number; data: RevenueDataPoint[] };
    lastYear: { year: number; data: RevenueDataPoint[] };
    filterType: string;
  },
  filterType: string
): TransformedDataPoint[] {
  const currentYearData = data.currentYear.data;
  const lastYearData = data.lastYear.data;

  return currentYearData.map((item, index) => {
    let period = "";

    if (filterType === "day") {
      period = (item.hour as string) || `${index}`;
    } else if (filterType === "week") {
      const date = new Date(item.date as string);
      period = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } else if (filterType === "month") {
      period = (item.day as string) || `Day ${index + 1}`;
    } else if (filterType === "year") {
      period = (item.month as string) || `Month ${index + 1}`;
    }

    return {
      period,
      currentYear: item.revenue,
      lastYear: lastYearData[index]?.revenue || 0,
    };
  });
}

const fetchRevenueData = async (
  filterType: FilterType,
  params?: Record<string, string | number>,
  token?: string
) => {
  const url = new URL(`${API_BASE_URL}/dashboard/revenue-report`);
  url.searchParams.append("filterType", filterType);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // ✅ FIXED: Send token here
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch revenue data");
  }

  return response.json() as Promise<RevenueData>;
};

export function RevenueChart() {
  const session = useSession();
  const token = (session?.data?.user as { accessToken?: string })?.accessToken;

  const [filterType, setFilterType] = useState<FilterType>("month");
  const [selectedMonth, setSelectedMonth] = useState(10);
  const [selectedYear, setSelectedYear] = useState(2025);

  const { data, isLoading, error } = useQuery({
    queryKey: ["revenue", filterType, selectedMonth, selectedYear, token],
    queryFn: () => {
      const params: Record<string, string | number> = {};
      if (filterType === "month") params.month = selectedMonth;
      if (filterType === "year") params.year = selectedYear;
      return fetchRevenueData(filterType, params, token);
    },
    enabled: !!token, // ✅ Only fetch if token exists
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const chartData = data ? transformChartData(data.data, filterType) : [];

  const periods = [
    { key: "day" as const, label: "Day" },
    { key: "week" as const, label: "Week" },
    { key: "month" as const, label: "Month" },
    { key: "year" as const, label: "Year" },
  ];

  // ✅ If user not logged in
  if (!token) {
    return (
      <div className="bg-[#EDE7F8] rounded-[8px] py-3 px-[14px]">
        <h2 className="text-base font-bold text-[#131313] pb-3">Revenue Report</h2>
        <Card className="bg-white rounded-[6px] p-6">
          <p className="text-slate-600 text-center">
            Please log in to view your revenue data.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-[#EDE7F8] rounded-[8px] py-3 px-[14px]">
      <h2 className="text-base font-bold text-[#131313] leading-[120%] pb-3 md:pb-4">
        Revenue Report
      </h2>

      <Card className="bg-white rounded-[6px]">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex gap-2 flex-wrap">
                {periods.map((period) => (
                  <button
                    key={period.key}
                    onClick={() => setFilterType(period.key)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      filterType === period.key
                        ? "bg-[#4D0EB9] text-white shadow-md"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>

              {filterType === "month" && (
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4D0EB9]"
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((monthName, index) => (
                    <option key={index} value={index + 1}>
                      {monthName}
                    </option>
                  ))}
                </select>
              )}

              {filterType === "year" && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4D0EB9]"
                >
                  {[2023, 2024, 2025].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-[#4D0EB9] animate-spin" />
                <p className="text-slate-600">Loading revenue data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-red-600 font-medium">Failed to load data</p>
                <p className="text-slate-600 text-sm mt-1">
                  Please try again later.
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="period"
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#64748b" }}
                />
                <YAxis
                  stroke="#64748b"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#64748b" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value) => formatCurrency(Number(value))}
                  labelStyle={{ color: "#1e293b" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="line"
                  formatter={(value) => (
                    <span className="text-sm text-slate-700">{value}</span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="currentYear"
                  stroke="#4D0EB9"
                  strokeWidth={3}
                  dot={false}
                  name={`Current Year (${data?.data.currentYear.year})`}
                  isAnimationActive
                />
                <Line
                  type="monotone"
                  dataKey="lastYear"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name={`Previous Year (${data?.data.lastYear.year})`}
                  isAnimationActive
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}












// "use client";

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Loader2 } from "lucide-react";
// import { transformChartData } from "@/lib/chart-utils";
// import { useSession } from "next-auth/react";

// function formatCurrency(value: number) {
//   if (typeof value !== "number" || isNaN(value)) {
//     return "$0.00";
//   }
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//   }).format(value);
// }

// type FilterType = "day" | "week" | "month" | "year";

// interface RevenueData {
//   success: boolean;
//   message: string;
//   data: {
//     currentYear: {
//       year: number;
//       data: Array<{
//         [key: string]: string | number;
//         revenue: number;
//         bookingCount: number;
//       }>;
//     };
//     lastYear: {
//       year: number;
//       data: Array<{
//         [key: string]: string | number;
//         revenue: number;
//         bookingCount: number;
//       }>;
//     };
//     filterType: FilterType;
//   };
// }

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// const fetchRevenueData = async (
//   filterType: FilterType,
//   params?: Record<string, string | number>
// ) => {
//   const url = new URL(`${API_BASE_URL}/dashboard/revenue-report`);
//   url.searchParams.append("filterType", filterType);

//   if (params) {
//     Object.entries(params).forEach(([key, value]) => {
//       url.searchParams.append(key, String(value));
//     });
//   }

//   const response = await fetch(url.toString());
//   if (!response.ok) {
//     throw new Error("Failed to fetch revenue data");
//   }
//   return response.json() as Promise<RevenueData>;
// };

// export function RevenueChart() {
//     const session = useSession();
//     const token = (session?.data?.user as { accessToken: string })?.accessToken;
//     console.log(token)
//   const [filterType, setFilterType] = useState<FilterType>("month");
//   const [selectedMonth, setSelectedMonth] = useState(10);
//   const [selectedYear, setSelectedYear] = useState(2025);

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["revenue", filterType, selectedMonth, selectedYear],
//     queryFn: () => {
//       const params: Record<string, string | number> = {};
//       if (filterType === "month") params.month = selectedMonth;
//       if (filterType === "year") params.year = selectedYear;
//       return fetchRevenueData(filterType, params);
//     },
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
//   });

//   const chartData = data ? transformChartData(data.data, filterType) : [];

//   const periods = [
//     { key: "day" as const, label: "Day" },
//     { key: "week" as const, label: "Week" },
//     { key: "month" as const, label: "Month" },
//     { key: "year" as const, label: "Year" },
//   ];

//   return (
//     <div className="bg-[#EDE7F8] rounded-[8px] py-3 px-[14px]">
//       <h2 className="text-base font-bold text-[#131313] leading-[120%] pb-3 md:pb-4">Revenue Report</h2>
//       {/* Chart Card */}
//       <Card className="bg-white rounded-[6px]">
//         <CardHeader >
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">

//             {/* Filter Controls */}
//             <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//               <div className="flex gap-2 flex-wrap">
//                 {periods.map((period) => (
//                   <button
//                     key={period.key}
//                     onClick={() => setFilterType(period.key)}
//                     className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
//                       filterType === period.key
//                         ? "bg-[#4D0EB9] text-white shadow-md"
//                         : "bg-slate-200 text-slate-700 hover:bg-slate-300"
//                     }`}
//                   >
//                     {period.label}
//                   </button>
//                 ))}
//               </div>

//               {/* Month Selector */}
//               {filterType === "month" && (
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(Number(e.target.value))}
//                   className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4D0EB9]"
//                 >
//                   {[
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                     "July",
//                     "August",
//                     "September",
//                     "October",
//                     "November",
//                     "December",
//                   ].map((monthName, index) => (
//                     <option key={index} value={index + 1}>
//                       {monthName}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {filterType === "year" && (
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(Number(e.target.value))}
//                   className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4D0EB9]"
//                 >
//                   {[2023, 2024, 2025].map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent className="">
//           {isLoading ? (
//             <div className="flex items-center justify-center h-96">
//               <div className="flex flex-col items-center gap-3">
//                 <Loader2 className="w-8 h-8 text-[#4D0EB9] animate-spin" />
//                 <p className="text-slate-600">Loading revenue data...</p>
//               </div>
//             </div>
//           ) : error ? (
//             <div className="flex items-center justify-center h-96">
//               <div className="text-center">
//                 <p className="text-red-600 font-medium">Failed to load data</p>
//                 <p className="text-slate-600 text-sm mt-1">
//                   Please try again later
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <ResponsiveContainer width="100%" height={400} >
//               <LineChart
//                 data={chartData}
//                 margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#e2e8f0"
//                   vertical={false}
//                 />
//                 <XAxis
//                   dataKey="period"
//                   stroke="#64748b"
//                   style={{ fontSize: "12px" }}
//                   tick={{ fill: "#64748b" }}
//                 />
//                 <YAxis
//                   stroke="#64748b"
//                   tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
//                   style={{ fontSize: "12px" }}
//                   tick={{ fill: "#64748b" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#fff",
//                     border: "1px solid #e2e8f0",
//                     borderRadius: "8px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                   }}
//                   formatter={(value) => formatCurrency(Number(value))}
//                   labelStyle={{ color: "#1e293b" }}
//                 />
//                 <Legend
//                   wrapperStyle={{ paddingTop: "20px" }}
//                   iconType="line"
//                   formatter={(value) => (
//                     <span className="text-sm text-slate-700">{value}</span>
//                   )}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="currentYear"
//                   stroke="#4D0EB9"
//                   strokeWidth={3}
//                   dot={false}
//                   name={`Current Year (${data?.data.currentYear.year})`}
//                   isAnimationActive={true}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="lastYear"
//                   stroke="#94a3b8"
//                   strokeWidth={2}
//                   strokeDasharray="5 5"
//                   dot={false}
//                   name={`Previous Year (${data?.data.lastYear.year})`}
//                   isAnimationActive={true}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
