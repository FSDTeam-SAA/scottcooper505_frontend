"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "JAN", line1: 30, line2: 20 },
  { month: "FEB", line1: 45, line2: 35 },
  { month: "MAR", line1: 60, line2: 50 },
  { month: "APR", line1: 55, line2: 65 },
  { month: "MAY", line1: 70, line2: 45 },
  { month: "JUN", line1: 65, line2: 55 },
  { month: "JUL", line1: 75, line2: 40 },
  { month: "AUG", line1: 80, line2: 50 },
  { month: "SEP", line1: 70, line2: 60 },
  { month: "OCT", line1: 60, line2: 70 },
  { month: "NOV", line1: 50, line2: 55 },
  { month: "DEC", line1: 45, line2: 40 },
]

export function RevenueChart() {
  return (
    <Card className="lg:col-span-2 bg-purple-50 border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Revenue report</CardTitle>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors">
              Day
            </button>
            <button className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors">
              Week
            </button>
            <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors font-medium">
              Month
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="line1"
              stroke="#6366f1"
              strokeDasharray="5 5"
              dot={false}
              name="Line 1"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="line2"
              stroke="#ec4899"
              strokeDasharray="5 5"
              dot={false}
              name="Line 2"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
