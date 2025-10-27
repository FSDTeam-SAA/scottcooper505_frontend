"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"

interface Booking {
  id: string
  serviceName: string
  price: string
  address: string
  date: string
  status: "active" | "completed"
}

const bookings: Booking[] = [
  {
    id: "1",
    serviceName: "Residential Construction",
    price: "$200.00",
    address: "123 Main Street Rd, New York, NY 10001",
    date: "04/27/2025",
    status: "active",
  },
  {
    id: "2",
    serviceName: "Residential Construction",
    price: "$200.00",
    address: "456 Oak Avenue Rd, Los Angeles, CA 90001",
    date: "04/27/2025",
    status: "active",
  },
  {
    id: "3",
    serviceName: "Residential Construction",
    price: "$200.00",
    address: "789 Pine Street Rd, Chicago, IL 60601",
    date: "04/27/2025",
    status: "active",
  },
  {
    id: "4",
    serviceName: "Residential Construction",
    price: "$200.00",
    address: "321 Elm Boulevard Rd, Houston, TX 77001",
    date: "04/27/2025",
    status: "active",
  },
]

export function BookingHistory() {
  return (
    <Card className="bg-purple-50 border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Booking History</CardTitle>
          <div className="flex gap-3">
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">See all</button>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">Top 3 Services</button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-300">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Service Name</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Address</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-slate-200 hover:bg-purple-100 transition-colors">
                  <td className="py-4 px-4 text-slate-900 font-medium">{booking.serviceName}</td>
                  <td className="py-4 px-4 text-slate-900 font-medium">{booking.price}</td>
                  <td className="py-4 px-4 text-slate-600 text-xs">{booking.address}</td>
                  <td className="py-4 px-4 text-slate-600">{booking.date}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white hover:bg-green-600">Active</Badge>
                      <button className="p-1 hover:bg-purple-200 rounded transition-colors">
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
