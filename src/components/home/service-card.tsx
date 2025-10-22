import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ServiceCard = ({
  service,
}: {
  service: { _id: number; serviceImg: string; title: string; desc: string };
}) => {
  return (
    <div className="p-5 rounded-lg shadow-[0px_0px_60px_0px_#0000003D] group ">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={service.serviceImg}
          alt="img.png"
          width={1000}
          height={1000}
          className="w-[472px] h-[255px] rounded-lg group-hover:scale-110 transition-all duration-300"
        />
      </div>

      <h1 className="mt-2 font-bold text-lg">{service.title}</h1>
      <p className="text-sm text-black/75 mb-4">{service.desc}</p>

      <div className="flex items-center justify-between">
        <Link href={`/services/${service._id}`}>
          <Button>
            Book Now <ArrowRight />
          </Button>
        </Link>

        <Button variant="outline" className="text-primary">
          See Details
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
