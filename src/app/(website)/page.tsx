import Contact from "@/components/home/contact";
import Hero from "@/components/home/Hero";
import OurService from "@/components/home/our-service";

const page = () => {
  return (
    <div className="space-y-24">
      <Hero />
      <OurService />
      <Contact />
    </div>
  );
};

export default page;
