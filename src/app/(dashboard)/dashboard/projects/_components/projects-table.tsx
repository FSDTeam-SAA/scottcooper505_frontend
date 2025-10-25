import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import React from "react";

const ProjectsTable = () => {
  return (
    <div>
      <Table className="lg:table-fixed lg:w-full">
        <TableHeader className="border-b border-t border-gray-300 ">
          <TableHead className="text-center text-black font-semibold">
            Projects Name
          </TableHead>
          <TableHead className="text-center text-black font-semibold">
            Added
          </TableHead>
          <TableHead className="text-center text-black font-semibold">
            Action
          </TableHead>
        </TableHeader>

        <TableBody className="text-center">
          <TableRow className="border-b border-gray-300 ">
            <TableCell className="lg:max-w-lg">
              <h1 className="font-semibold">
                Lorem ipsum dolor sit consectetur elit
              </h1>
              <p className="lg:max-w-md opacity-75 mt-1">
                t is a long established fact that a reader will be distracted by
                the readable content of a page when looking at its layout. The
                point of using Lorem Ipsum is that it{" "}
              </p>
            </TableCell>
            <TableCell>04/21/2025 03:18pm</TableCell>
            <TableCell>
              <div className="opacity-60 space-x-2">
                <button>
                  <Edit className="h-5 w-5" />
                </button>
                <button>
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
