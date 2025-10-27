import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WalletTableProps {
  allWallet: {
    services: {
      totalPayment: number;
      bookingCount: number;
      serviceId: string;
      title: string;
      createdAt: string;
    }[];
    totalRevenue: number;
  };
}

const WalletTable = ({ allWallet }: WalletTableProps) => {
  return (
    <div>
      <Table>
        <TableHeader className="border-b border-t border-gray-300">
          <TableRow>
            <TableHead className="text-center text-black font-semibold">
              Service Name
            </TableHead>
            <TableHead className="text-center text-black font-semibold">
              Date
            </TableHead>
            <TableHead className="text-center text-black font-semibold">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-center">
          {allWallet?.services?.length > 0 ? (
            allWallet.services.map((service) => (
              <TableRow
                key={service.serviceId}
                className="border-b border-gray-300"
              >
                <TableCell>{service.title}</TableCell>
                <TableCell>
                  {new Date(service.createdAt).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell>${service.totalPayment.toFixed(2)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-gray-500 py-4">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="text-right font-semibold text-black mt-4">
        Total Revenue: ${allWallet?.totalRevenue?.toFixed(2) || 0}
      </div>
    </div>
  );
};

export default WalletTable;
