import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const BookingsTable = () => {
  return (
    <div className="mt-8">
      <Table>
        <TableHeader className="border border-gray-300 ">
          <TableHead className="text-center text-black font-semibold">
            Service Name
          </TableHead>
          <TableHead className="text-center text-black font-semibold">
            Price
          </TableHead>
          <TableHead className="text-center text-black font-semibold">
            Date
          </TableHead>
          <TableHead className="text-center text-black font-semibold">
            Action
          </TableHead>
        </TableHeader>

        <TableBody className="border border-gray-300">
          <TableRow className="text-center border border-gray-300">
            <TableCell>Residential Construction</TableCell>
            <TableCell>$200.00</TableCell>
            <TableCell>04/21/2025 </TableCell>
            <TableCell>
              <button className="py-1 px-5 rounded-3xl bg-[#058001] text-white font-bold">
                Approved
              </button>
            </TableCell>
          </TableRow>

          <TableRow className="text-center border border-gray-300">
            <TableCell>Residential Construction</TableCell>
            <TableCell>$200.00</TableCell>
            <TableCell>04/21/2025 </TableCell>
            <TableCell>
              <button className="py-1 px-5 rounded-3xl bg-[#058001] text-white font-bold">
                Approved
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
