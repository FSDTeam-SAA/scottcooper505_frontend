"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserProfileContainer = () => {
  return (
    <div>
      <PathTracker />
      <div className="pt-6 md:pt-7 lg:pt-8">
        <Table>
          <TableHeader >
            <TableRow className="border border-[#B6B6B6]">
              <TableHead className="text-center">Users Name</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Phone Number</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserProfileContainer;
