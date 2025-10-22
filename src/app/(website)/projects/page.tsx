import HeroSection from "@/components/common/Hero-Section";
import React from "react";

const ProjectsPage = () => {
  return (
    <div className="mt-24">
      <HeroSection
        img="/assets/images/project-hero.jpg"
        title="Our Work"
        desc="Explore our portfolio of completed projects showcasing our expertise 
and creative solutions."
      />
    </div>
  );
};

export default ProjectsPage;
