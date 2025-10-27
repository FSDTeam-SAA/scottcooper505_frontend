"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = {
  day: [
    { period: "12 AM", dayStat: 10, lastYear: 8 },
    { period: "4 AM", dayStat: 15, lastYear: 12 },
    { period: "8 AM", dayStat: 35, lastYear: 28 },
    { period: "12 PM", dayStat: 55, lastYear: 45 },
    { period: "4 PM", dayStat: 75, lastYear: 65 },
    { period: "8 PM", dayStat: 65, lastYear: 55 },
  ],
  week: [
    { period: "MON", dayStat: 30, lastYear: 25 },
    { period: "TUE", dayStat: 45, lastYear: 38 },
    { period: "WED", dayStat: 55, lastYear: 48 },
    { period: "THU", dayStat: 65, lastYear: 58 },
    { period: "FRI", dayStat: 75, lastYear: 68 },
    { period: "SAT", dayStat: 60, lastYear: 55 },
    { period: "SUN", dayStat: 40, lastYear: 35 },
  ],
  month: [
    { period: "JAN", dayStat: 20, lastYear: 15 },
    { period: "FEB", dayStat: 35, lastYear: 28 },
    { period: "MAR", dayStat: 55, lastYear: 45 },
    { period: "APR", dayStat: 75, lastYear: 65 },
    { period: "MAY", dayStat: 85, lastYear: 70 },
    { period: "JUN", dayStat: 70, lastYear: 80 },
    { period: "JUL", dayStat: 65, lastYear: 75 },
    { period: "AUG", dayStat: 55, lastYear: 60 },
    { period: "SEP", dayStat: 45, lastYear: 50 },
    { period: "OCT", dayStat: 35, lastYear: 40 },
  ],
  year: [
    { period: "2019", dayStat: 40, lastYear: 35 },
    { period: "2020", dayStat: 55, lastYear: 48 },
    { period: "2021", dayStat: 65, lastYear: 58 },
    { period: "2022", dayStat: 75, lastYear: 68 },
    { period: "2023", dayStat: 85, lastYear: 78 },
    { period: "2024", dayStat: 70, lastYear: 65 },
  ],
}

export function RevenueChart() {
  const [timePeriod, setTimePeriod] = useState<"day" | "week" | "month" | "year">("month")

  const periods = [
    { key: "day" as const, label: "Day" },
    { key: "week" as const, label: "Week" },
    { key: "month" as const, label: "Month" },
    { key: "year" as const, label: "Year" },
  ]

  return (
    <Card className="w-full bg-purple-50 border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Revenue report</CardTitle>
          <div className="flex gap-2">
            {periods.map((period) => (
              <button
                key={period.key}
                onClick={() => setTimePeriod(period.key)}
                className={`px-3 py-1.5 text-xs rounded transition-colors font-medium ${
                  timePeriod === period.key
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData[timePeriod]} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="period" stroke="#94a3b8" style={{ fontSize: "12px" }} />
            <YAxis
              stroke="#94a3b8"
              tickFormatter={(value) => `${value}K`}
              style={{ fontSize: "12px" }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
              formatter={(value) => `${value}K`}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
            <Line
              type="monotone"
              dataKey="dayStat"
              stroke="#6366f1"
              strokeDasharray="5 5"
              dot={false}
              name="Day Stat"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#ec4899"
              strokeDasharray="5 5"
              dot={false}
              name="Last Year"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}











// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// const data = [
//   { month: "JAN", line1: 30, line2: 20 },
//   { month: "FEB", line1: 45, line2: 35 },
//   { month: "MAR", line1: 60, line2: 50 },
//   { month: "APR", line1: 55, line2: 65 },
//   { month: "MAY", line1: 70, line2: 45 },
//   { month: "JUN", line1: 65, line2: 55 },
//   { month: "JUL", line1: 75, line2: 40 },
//   { month: "AUG", line1: 80, line2: 50 },
//   { month: "SEP", line1: 70, line2: 60 },
//   { month: "OCT", line1: 60, line2: 70 },
//   { month: "NOV", line1: 50, line2: 55 },
//   { month: "DEC", line1: 45, line2: 40 },
// ]

// export function RevenueChart() {
//   return (
//     <Card className="lg:col-span-2 bg-purple-50 border-0 shadow-sm">
//       <CardHeader className="pb-4">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-lg font-semibold text-slate-900">Revenue report</CardTitle>
//           <div className="flex gap-2">
//             <button className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors">
//               Day
//             </button>
//             <button className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors">
//               Week
//             </button>
//             <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors font-medium">
//               Month
//             </button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="month" stroke="#94a3b8" />
//             <YAxis stroke="#94a3b8" />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#fff",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "8px",
//               }}
//             />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="line1"
//               stroke="#6366f1"
//               strokeDasharray="5 5"
//               dot={false}
//               name="Line 1"
//               strokeWidth={2}
//             />
//             <Line
//               type="monotone"
//               dataKey="line2"
//               stroke="#ec4899"
//               strokeDasharray="5 5"
//               dot={false}
//               name="Line 2"
//               strokeWidth={2}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   )
// }
