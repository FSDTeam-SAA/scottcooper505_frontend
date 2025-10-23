import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BookingsTable = () => {
  return (
    <div>
      <Table>
        <TableHeader className="border-b border-t border-gray-300 ">
          <TableHead className="text-center text-black font-semibold">Service Name</TableHead>
          <TableHead className="text-center text-black font-semibold">Price</TableHead>
          <TableHead className="text-center text-black font-semibold">Address</TableHead>
          <TableHead className="text-center text-black font-semibold">Date</TableHead>
          <TableHead className="text-center text-black font-semibold">Action</TableHead>
        </TableHeader>

        <TableBody className="text-center">
          <TableRow className="border-b border-gray-300 ">
            <TableCell>Residential Construction</TableCell>
            <TableCell>$200.00</TableCell>
            <TableCell>
              2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
            </TableCell>
            <TableCell>04/21/2025 03:18pm</TableCell>

            <TableCell>
              <Select defaultValue="approved">
                <SelectTrigger className="border border-primary w-[180px] mx-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">
                    <span className="text-[#058001] font-bold">Approved</span>
                  </SelectItem>
                  <SelectItem value="processing">
                    <span className="text-[#9407e0] font-bold">Processing</span>
                  </SelectItem>
                  <SelectItem value="cancel">
                    <span className=" text-[#fd5858] font-bold">Cancel</span>
                  </SelectItem>
                  <SelectItem value="completed">
                    <span className="text-[#4d0eb9] font-bold">Completed</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>

          <TableRow className="border-b border-gray-300 ">
            <TableCell>Residential Construction</TableCell>
            <TableCell>$200.00</TableCell>
            <TableCell>
              2972 Westheimer Rd. Santa Ana, Illinois 85486{" "}
            </TableCell>
            <TableCell>04/21/2025 03:18pm</TableCell>

            <TableCell>
              <Select defaultValue="approved">
                <SelectTrigger className="border border-primary w-[180px] mx-auto">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">
                    <span className="text-[#058001] font-bold">Approved</span>
                  </SelectItem>
                  <SelectItem value="processing">
                    <span className="text-[#9407e0] font-bold">Processing</span>
                  </SelectItem>
                  <SelectItem value="cancel">
                    <span className=" text-[#fd5858] font-bold">Cancel</span>
                  </SelectItem>
                  <SelectItem value="completed">
                    <span className="text-[#4d0eb9] font-bold">Completed</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
