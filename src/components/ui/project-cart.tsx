// components/ui/ProjectCart.tsx
"use client";

import React from "react";
import { HeroVideoDialog } from "./hero-video-dialog";
import { MapPin, Tag, FileImage } from "lucide-react";
import Image from "next/image";

// --- Types ---

export type ProjectType = {
  id: number;
  title: string;
  image: string;
  desc: string;
  location: string;
  type: string;
  video?: {
    url: string;
    type?: string;
  };
};

// --- Component ---
const ProjectCart: React.FC<{ projectData: ProjectType }> = ({
  projectData,
}) => {
  const hasVideo = !!projectData.video?.url;

  return (
    <div className="group">
      {/* Video or Image Section */}
      <div className="relative cursor-pointer">
        {hasVideo ? (
          <>
            <HeroVideoDialog
              className="block dark:hidden w-full h-[300px] rounded-t-[16px]"
              animationStyle="top-in-bottom-out"
              videoSrc={projectData.video!.url}
              thumbnailSrc={projectData.image}
              thumbnailAlt={projectData.title}
            />
            <HeroVideoDialog
              className="hidden dark:block w-full h-[300px] rounded-t-[16px]"
              animationStyle="top-in-bottom-out"
              videoSrc={projectData.video!.url}
              thumbnailSrc={projectData.image}
              thumbnailAlt={projectData.title}
            />
          </>
        ) : (
          <>
            <Image
              src={projectData.image}
              alt={projectData.title}
              width={1000}
              height={1000}
              className="w-full h-[300px] object-cover rounded-t-[16px]"
            />
            <span className="absolute top-4 right-4 bg-white p-3 rounded-full shadow">
              <FileImage />
            </span>
          </>
        )}
      </div>

      {/* Project Info */}
      <div className="bg-white rounded-b-[16px] pt-3 md:pt-4 px-4 md:px-5 lg:px-6 pb-4 md:pb-5 lg:pb-6 mt-32">
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#1D1A22] leading-[120%]">
          {projectData.title}
        </h4>

        <div className="flex items-center gap-3 md:gap-4 py-3 md:py-4 text-[#5B6574]">
          <span className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            {projectData.type}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {projectData.location}
          </span>
        </div>

        <p className="text-sm md:text-base font-normal leading-[150%] text-[#4A484E]">
          {projectData.desc}
        </p>
      </div>
    </div>
  );
};

export default ProjectCart;
