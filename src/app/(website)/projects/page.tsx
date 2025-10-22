import HeroSection from "@/components/common/Hero-Section";
import React from "react";
import ProjectContainer from "./_components/project-container";

const ProjectsPage = () => {
  return (
    <div className="mt-24">
      <HeroSection
        img="/assets/images/project-hero.jpg"
        title="Our Work"
        desc="Explore our portfolio of completed projects showcasing our expertise 
and creative solutions."
      />
      <ProjectContainer/>
    </div>
  );
};

export default ProjectsPage;
