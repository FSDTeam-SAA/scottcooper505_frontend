"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTruncatedText } from "@/utils/getTruncatedText";
import DeleteProject from "./delete-project";

interface PropertiesType {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface Props {
  properties: PropertiesType[];
  isLoading: boolean;
}

const ProjectsTable = ({ properties, isLoading }: Props) => {
  const skeletonRows = Array.from({ length: 5 });

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
          {isLoading
            ? skeletonRows.map((_, idx) => (
                <TableRow key={idx} className="border-b border-gray-300">
                  <TableCell className="lg:max-w-lg">
                    <Skeleton className="h-5 w-32 mx-auto" />
                    <Skeleton className="h-3 w-48 mt-2 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24 mx-auto" />
                    <Skeleton className="h-5 w-24 mt-1 mx-auto" />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-5 w-5" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : properties?.map((item) => (
                <TableRow key={item._id} className="border-b border-gray-300 ">
                  <TableCell className="lg:max-w-lg">
                    <h1 className="font-semibold">{item?.title}</h1>
                    <p className="lg:max-w-md opacity-75 mt-1">
                      {getTruncatedText(item?.description, 200)}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <p>{new Date(item?.createdAt)?.toLocaleDateString()}</p>
                      <p>{new Date(item?.createdAt)?.toLocaleTimeString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="opacity-60 space-x-2">
                      <button>
                        <Edit className="h-5 w-5" />
                      </button>
                      <DeleteProject id={item?._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
