import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTruncatedText } from "@/utils/getTruncatedText";

interface Service {
  _id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
}

interface Props {
  service: Service;
}

const ServiceCard = ({ service }: Props) => {
  return (
    <div className="p-5 rounded-lg shadow-[0px_0px_60px_0px_#0000003D] group ">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={service?.thumbnail}
          alt="img.png"
          width={1000}
          height={1000}
          className="w-[472px] h-[255px] rounded-lg group-hover:scale-110 transition-all duration-300"
        />
      </div>

      <h1 className="mt-2 font-bold text-lg">{service?.title}</h1>
      <p className="text-sm md:text-base text-[#4A484E] leading-[150%] my-1">
        {getTruncatedText(service?.description, 100)}
      </p>

      <p className="text-base md:text-lg font-semibold text-black leading-[120%] pb-2">
        Price : $ {service?.price}
      </p>

      <div className="flex items-center justify-between">
        <Link href={`/booking/${service?._id}`}>
          <Button>
            Book Now <ArrowRight />
          </Button>
        </Link>

        <Link href={`/services/${service?._id}`}>
          <Button variant="outline" className="text-primary">
            See Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
