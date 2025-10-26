"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"

interface StatCard {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  color: string
  chartColor: string
  chartData: Array<{ value: number }>
}

const stats: StatCard[] = [
  {
    label: "Total Revenue",
    value: "$12,570",
    change: "3.5% vs last month",
    trend: "up",
    color: "bg-blue-50",
    chartColor: "#3b82f6",
    chartData: [{ value: 20 }, { value: 35 }, { value: 30 }, { value: 45 }, { value: 40 }],
  },
  {
    label: "Total Services",
    value: "10",
    change: "The Month",
    trend: "up",
    color: "bg-purple-50",
    chartColor: "#a855f7",
    chartData: [{ value: 25 }, { value: 40 }, { value: 35 }, { value: 50 }, { value: 45 }],
  },
  {
    label: "Total User",
    value: "132,570",
    change: "2.5% vs last month",
    trend: "up",
    color: "bg-pink-50",
    chartColor: "#ec4899",
    chartData: [{ value: 30 }, { value: 45 }, { value: 40 }, { value: 55 }, { value: 50 }],
  },
  {
    label: "Total Booking",
    value: "132,570",
    change: "1.5% vs last month",
    trend: "up",
    color: "bg-green-50",
    chartColor: "#22c55e",
    chartData: [{ value: 25 }, { value: 38 }, { value: 32 }, { value: 48 }, { value: 42 }],
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className={`${stat.color} border-0 shadow-sm hover:shadow-md transition-shadow`}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-500">{stat.change}</span>
                  </div>
                  <div className="w-12 h-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stat.chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Line type="monotone" dataKey="value" stroke={stat.chartColor} dot={false} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
