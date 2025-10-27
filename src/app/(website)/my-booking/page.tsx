import { BookingsTable } from "./_components/bookings-table";

const page = () => {
  return (
    <div className="min-h-[calc(100vh-400px)] mt-40 container">
      <div>
        <h1 className="text-center font-medium text-3xl">My Bookings</h1>
      </div>

      <div>
        <BookingsTable />
      </div>
    </div>
  );
};

export default page;
