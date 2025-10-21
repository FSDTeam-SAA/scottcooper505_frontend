import Contact from "@/components/home/contact";
import Hero from "@/components/home/Hero";
import OurService from "@/components/home/our-service";
import Testimonials from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";

const page = () => {
  return (
    <div className="space-y-24">
      <Hero />
      <OurService />
      <Contact />
      <WhyChoose />
      <Testimonials />
    </div>
  );
};

export default page;
