"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import React, { useState } from "react";
import ProjectsTable from "./projects-table";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PathTracker />

        <Link href={'/dashboard/projects/add-project'}>
          <Button>
            <Plus /> Add Project
          </Button>
        </Link>
      </div>

      <div>
        <ProjectsTable />
      </div>

      {/* pagination here  */}
      <div className="bg-transparent flex items-center justify-between p-4 bg-white">
        <p className="text-sm md:text-base font-medium leading-[120%]  text-[#3F3F3F]">
          Showing {currentPage}
          of 259 results
        </p>
        <div>
          <ScottcooperPagination
            totalPages={3}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
