"use client";
import PathTracker from "@/app/(dashboard)/_components/path-tracker";
import React, { useState } from "react";
import ProjectsTable from "./projects-table";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const Projects = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allProject = {}, isLoading } = useQuery({
    queryKey: ["all-project", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      return data?.data;
    },
    enabled: !!token,
  });

  const properties = allProject?.properties;
  const pagination = allProject?.pagination;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PathTracker />

        <Link href={"/dashboard/projects/add-project"}>
          <Button>
            <Plus /> Add Project
          </Button>
        </Link>
      </div>

      <div>
        <ProjectsTable properties={properties} isLoading={isLoading} />
      </div>

      {/* pagination here  */}
      {pagination?.totalPages > 1 && (
        <div className="bg-transparent flex items-center justify-between p-4 bg-white">
          <p className="text-sm md:text-base font-medium leading-[120%]  text-[#3F3F3F]">
            Showing {currentPage}
            of {pagination?.totalData} results
          </p>
          <div>
            <ScottcooperPagination
              totalPages={pagination?.totalPages}
              currentPage={pagination?.currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
