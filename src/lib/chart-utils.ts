export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

interface RevenueDataPoint {
  [key: string]: string | number
  revenue: number
  bookingCount: number
}

interface TransformedDataPoint {
  period: string
  currentYear: number
  lastYear: number
}

export function transformChartData(
  data: {
    currentYear: { year: number; data: RevenueDataPoint[] }
    lastYear: { year: number; data: RevenueDataPoint[] }
    filterType: string
  },
  filterType: string,
): TransformedDataPoint[] {
  const currentYearData = data.currentYear.data
  const lastYearData = data.lastYear.data

  return currentYearData.map((item, index) => {
    let period = ""

    if (filterType === "day") {
      period = (item.hour as string) || `${index}`
    } else if (filterType === "week") {
      const date = new Date(item.date as string)
      period = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    } else if (filterType === "month") {
      period = (item.day as string) || `Day ${index + 1}`
    } else if (filterType === "year") {
      period = (item.month as string) || `Month ${index + 1}`
    }

    return {
      period,
      currentYear: item.revenue,
      lastYear: lastYearData[index]?.revenue || 0,
    }
  })
}
