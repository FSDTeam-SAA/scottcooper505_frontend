"use client"

import PathTracker from '@/app/(dashboard)/_components/path-tracker'
import { Button } from '@/components/ui/button'
import { Eye, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScottcooperPagination from '@/components/ui/ScottcooperPagination'

const ServicesContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const servicesData = [
        {
            id: 1,
            serviceName : "Service 1",
            price : "$100",
            date : "01/01/2023",
        },
        {
            id: 2,
            serviceName : "Service 1",
            price : "$100",
            date : "01/01/2023",
        },
        {
            id: 3,
            serviceName : "Service 1",
            price : "$100",
            date : "01/01/2023",
        },
        {
            id: 4,
            serviceName : "Service 1",
            price : "$100",
            date : "01/01/2023",
        },
        {
            id: 5,
            serviceName : "Service 1",
            price : "$100",
            date : "01/01/2023",
        },
    ]

  return (
    <div>
        <div className="flex items-center justify-between  p-5">
        <PathTracker />

        <Link href={"/dashboard/services/add-service"}>
          <Button>
            <Plus /> Add Resource
          </Button>
        </Link>
      </div>
      <div className="pt-6 md:pt-7 lg:pt-8">
        <Table>
          <TableHeader>
            <TableRow className="border border-[#B6B6B6]">
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                service Name
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
               Price
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Date
              </TableHead>
              <TableHead className="text-center text-base font-bold text-[#131313] leading-[120%]">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border border-[#B6B6B6]">
            {servicesData.map((service) => {
              return (
                <TableRow key={service?.id} className="border border-[#B6B6B6] ">
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {service.serviceName || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#131313] leading-[120%] text-center py-[14px]">
                    {service.price || "N/A"}
                  </TableCell>
                  <TableCell className="text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                    {service.date || "N/A"}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-2 text-base font-semibold text-[#424242] leading-[120%] text-center py-[14px]">
                    <Eye className="w-5 h-5 cursor-pointer" />
                    <Trash2 className="w-5 h-5 cursor-pointer" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* pagination here  */}
        <div>
          <div className="bg-transparent flex items-center justify-between pt-4 md:pt-6 lg:pt-8">
                <p className="text-sm md:text-base font-medium leading-[120%]  text-[#3F3F3F]">
                  Showing {currentPage}
                  of 259 results
                </p>
                <div>
                  <ScottcooperPagination
                    totalPages={4}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesContainer
