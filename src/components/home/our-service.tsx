import { ArrowRight } from "lucide-react";

const OurService = () => {
  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Our Services</h1>
          <p className="lg:max-w-xl text-sm text-black/75">
            Comprehensive construction solutions for residential and commercial
            properties in north-west Tennessee and surrounding areas.
          </p>
        </div>

        <div>
          <button className="text-primary font-bold flex items-center gap-2">
            See More <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OurService;
