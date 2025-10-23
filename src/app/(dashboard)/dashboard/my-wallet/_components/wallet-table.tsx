import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WalletTable = () => {
  return (
    <div>
      <Table>
        <TableHeader className="border-b border-t border-gray-300 ">
          <TableHead className="text-center text-black font-semibold">
            Service Name
          </TableHead>
          <TableHead className="text-center text-black font-semibold">
            Date
          </TableHead>
          <TableHead className="text-center text-black font-semibold">
            Amount
          </TableHead>
        </TableHeader>

        <TableBody className="text-center">
          <TableRow className="border-b border-gray-300 ">
            <TableCell>Residential Construction</TableCell>
            <TableCell>04/21/2025 03:18pm</TableCell>
            <TableCell>$200.00</TableCell>
          </TableRow>

          <TableRow className="border-b border-gray-300 ">
            <TableCell>Residential Construction</TableCell>
            <TableCell>04/21/2025 03:18pm</TableCell>
            <TableCell>$200.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default WalletTable;
