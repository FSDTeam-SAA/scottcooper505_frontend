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
        <div className="h-full grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <BookingHistory />
          </div>
          <div className="md:col-span-2">
            <TopServices />
          </div>
        </div>
      </div>
    </main>
  );
}
