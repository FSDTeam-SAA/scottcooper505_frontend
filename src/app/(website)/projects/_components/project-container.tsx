"use client";

import ScottcooperDropdownSelector from "@/components/ui/ScottcooperDropdownSelector";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Funnel, MapPin, Tag, FileImage, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getTruncatedText } from "@/utils/getTruncatedText";

interface Project {
  _id: string;
  title: string;
  location: string;
  areaType: string;
  description: string;
  images: string[];
  videos: string[];
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ProjectResponse {
  properties: Project[];
  pagination: Pagination;
}

const projectTypeLists = [
  { id: 1, name: "INDUSTRY", value: "industry" },
  { id: 2, name: "HEMP/CBD", value: "cbd" },
  { id: 3, name: "RECREATIONAL CANNABIS", value: "recreational" },
];

const ProjectContainer = () => {
  const [projectType, setProjectType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allProject, isLoading } = useQuery<ProjectResponse>({
    queryKey: ["all-project", currentPage],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project?page=${currentPage}&limit=6`
      );
      const json = await res.json();
      return json.data;
    },
  });

  const properties = allProject?.properties || [];
  const pagination = allProject?.pagination;

  return (
    <div className="container mx-auto">
      <div className="py-8 md:py-12 lg:py-16">
        <h3 className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl font-semibold text-[#1D1A22] leading-[120%]">
          <Funnel />
          Filter Projects
        </h3>

        <div className="w-full mt-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2">
            <h4 className="text-base md:text-lg font-semibold text-[#5B6574] pb-2">
              Project Type
            </h4>
            <ScottcooperDropdownSelector
              list={projectTypeLists}
              selectedValue={projectType}
              onValueChange={setProjectType}
              placeholderText="All Types"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h4 className="text-base md:text-lg font-semibold text-[#5B6574] pb-2">
              Location
            </h4>
            <ScottcooperDropdownSelector
              list={projectTypeLists}
              selectedValue={projectType}
              onValueChange={setProjectType}
              placeholderText="All Location"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full h-[356px] rounded-[16px]" />
                <Skeleton className="w-3/4 h-5" />
                <Skeleton className="w-1/2 h-4" />
                <Skeleton className="w-full h-3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
            {properties.map((project) => {
              const hasVideo = project.videos?.length > 0;
              const hasImage = project.images?.length > 0;
              const previewSrc = hasVideo
                ? "/video-thumbnail.png"
                : hasImage
                ? project.images[0]
                : "/no-image.png";

              return (
                <div key={project._id} className="pb-6">
                  <div className="relative cursor-pointer">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative">
                          {hasVideo ? (
                            <video
                              src={project.videos[0]}
                              className="w-[496px] h-[356px] object-cover rounded-t-[16px]"
                              muted
                              loop
                              autoPlay
                            />
                          ) : (
                            <Image
                              src={previewSrc}
                              alt={project.title}
                              width={1000}
                              height={1000}
                              className="w-[496px] h-[356px] object-cover rounded-t-[16px]"
                            />
                          )}

                          <span className="absolute top-4 right-4 bg-white p-3 rounded-full">
                            {hasVideo ? <Video /> : <FileImage />}
                          </span>
                        </div>
                      </DialogTrigger>

                      {/* Modal Content */}
                      <DialogContent className="max-w-4xl p-0 overflow-hidden">
                        {hasVideo ? (
                          <video
                            src={project.videos[0]}
                            controls
                            className="w-full h-[700px] rounded-md"
                          />
                        ) : (
                          <Image
                            src={project.images[0]}
                            alt={project.title}
                            width={1920}
                            height={1080}
                            className="w-full h-[700px] object-contain rounded-md"
                          />
                        )}
                      </DialogContent>
                    </Dialog>

                    <div className="bg-white rounded-b-[16px] pt-4 px-5 pb-5">
                      <h4 className="text-lg md:text-xl font-semibold text-[#1D1A22] leading-[120%]">
                        {project.title}
                      </h4>

                      <div className="flex items-center gap-3 py-3 text-[#4A484E]">
                        <span className="flex items-center gap-2">
                          <Tag className="w-5 h-5" />
                          {project.areaType}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          {project.location}
                        </span>
                      </div>

                      <p className="text-sm md:text-base text-[#4A484E] leading-[150%]">
                        {getTruncatedText(project?.description, 100)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {(pagination?.totalPages ?? 0) > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm md:text-base font-medium text-[#3F3F3F]">
              Showing page {pagination?.currentPage ?? currentPage} of{" "}
              {pagination?.totalPages ?? 0} ({pagination?.totalData ?? 0}{" "}
              results)
            </p>

            <div>
              <ScottcooperPagination
                totalPages={pagination?.totalPages ?? 0}
                currentPage={pagination?.currentPage ?? currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectContainer;
