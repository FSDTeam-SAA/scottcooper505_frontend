"use client";

import ScottcooperDropdownSelector from "@/components/ui/ScottcooperDropdownSelector";
import ScottcooperPagination from "@/components/ui/ScottcooperPagination";
import { Funnel, MapPin, Tag, FileImage } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const projectTypeLists = [
  { id: 1, name: "INDUSTRY", value: "industry" },
  { id: 2, name: "HEMP/CBD", value: "cbd" },
  { id: 3, name: "RECREATIONAL CANNABIS", value: "recreational" },
];

const ProjectContainer = () => {
  const [projectType, setProjectType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsData = [
    {
      id: 1,
      title: "Modern Apartment Complex",
      image: "/assets/images/project1.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
      video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 2,
      title: "Modern Apartment Complex",
      image: "/assets/images/project2.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 3,
      title: "Modern Apartment Complex",
      image: "/assets/images/project3.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 4,
      title: "Modern Apartment Complex",
      image: "/assets/images/project1.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 5,
      title: "Modern Apartment Complex",
      image: "/assets/images/project2.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 6,
      title: "Modern Apartment Complex",
      image: "/assets/images/project3.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 7,
      title: "Modern Apartment Complex",
      image: "/assets/images/project1.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 8,
      title: "Modern Apartment Complex",
      image: "/assets/images/project2.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
    {
      id: 9,
      title: "Modern Apartment Complex",
      image: "/assets/images/project3.jpg",
      desc: "A luxury apartment complex with 200 units featuring, modern, amenities, and sustainable",
      location: "New York",
      type: "Residential",
       video: {
        url: "/assets/videos/project1.mp4",
        type: "video/mp4",
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="pt-8 md:pt-12 lg:pt-16">
        <h3 className="flex items-center gap-2 text-lg md:text-xl lg:text-2xl font-semibold text-[#1D1A22] leading-[120%]">
          <Funnel />
          Filter Projects
        </h3>
        <div className="w-full mt-2 md:mt-3 lg:mt-4 flex items-center justify-between gap-4 md:gap-5 lg:gap-6">
          <div className="w-1/2">
            <h4 className="text-base md:text-lg font-semibold text-[#5B6574] leading-[120%] pb-2 md:pb-3 lg:pb-4">
              Project Type
            </h4>
            <ScottcooperDropdownSelector
              list={projectTypeLists}
              selectedValue={projectType}
              onValueChange={setProjectType}
              placeholderText="All Types"
            />
          </div>
          <div className="w-1/2">
            <h4 className="text-base md:text-lg font-semibold text-[#5B6574] leading-[120%] pb-2 md:pb-3 lg:pb-4">
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
        {/* cart data here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 pt-6 md:pt-10 lg:pt-[56px]">
          {projectsData?.map((project) => {
            return (
              <div key={project.id} className="pb-4 md:pb-6 lg:pb-8">
                <div
                  className="relative cursor-pointer"
                >
                  <Image
                    src={project?.image}
                    alt={project?.title}
                    width={1000}
                    height={1000}
                    className="w-[496px] h-[356px] object-cover rounded-t-[16px]"
                  />
                  <span className="absolute top-4 right-4 bg-white p-3 rounded-full">
                    <FileImage />
                  </span>
                </div>
                <div className="bg-white rounded-b-[16px] pt-3 md:pt-4 px-4 md:px-5 lg:px-6 pb-4 md:pb-5 lg:pb-6">
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#1D1A22] leading-[120%]">
                    {project?.title}
                  </h4>
                  <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4">
                    <span className="flex items-center gap-2">
                      <Tag className="w-6 h-6" />
                      {project?.type}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-6 h-6" />
                      {project?.location}
                    </span>
                  </div>
                  <p className="text-sm md:text-base font-normal leading-[150%] text-[#4A484E]">
                    {project?.desc}
                  </p>
                </div>
              </div>

              //   <div key={project.id} className="pb-4 md:pb-6 lg:pb-8">
              //    <ProjectCart key={project.id} projectData={project} />
               
              // </div>
            );
          })}
        </div>

        {/* pagination here  */}
        <div className="bg-transparent flex items-center justify-between pt-4 md:pt-6 lg:pt-8">
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

     
    </div>
  );
};

export default ProjectContainer;
