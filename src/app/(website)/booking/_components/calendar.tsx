"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  availableDates: Date[]
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
}

export default function Calendar({ availableDates, selectedDate, onSelectDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isDateAvailable = (date: Date) => {
    return availableDates.some((availDate) => availDate.toDateString() === date.toDateString())
  }

  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString()
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
  }

  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="space-y-4">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-foreground">{monthName}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const available = isDateAvailable(date)
          const selected = isDateSelected(date)

          return (
            <button
              key={date.toISOString()}
              onClick={() => available && onSelectDate(date)}
              disabled={!available}
              className={`
                aspect-square rounded-lg font-medium text-sm transition-all
                ${
                  !available
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    : selected
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-foreground hover:border-primary hover:shadow-sm"
                }
              `}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
