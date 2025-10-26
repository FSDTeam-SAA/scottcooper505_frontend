import { BookingHistory } from "../_components/booking-history";
import { DashboardHeader } from "../_components/dashboard-header";
import { RevenueChart } from "../_components/revenue-chart";
import { StatCards } from "../_components/stat-cards";
import { TopServices } from "../_components/top-services";


export default function DashboardPage() {
  return (
    <main className="min-h-screen  p-6">
      <div className=" space-y-6">
        <DashboardHeader />
        <StatCards />
        <RevenueChart />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingHistory />
          <TopServices />
        </div>
      </div>
    </main>
  )
}
