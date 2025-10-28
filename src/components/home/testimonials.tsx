"use client";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
}

interface Service {
  _id: string;
  title: string;
}

interface Testimonial {
  _id: string;
  service: Service;
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["all-review"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`);
      const data = await res.json();
      return data?.data?.reviews || [];
    },
  });

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 2 ? 0 : prev + 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 2 : prev - 2));
  };

  const TestimonialSkeleton = () => (
    <div className="shadow-[0px_2px_15px_0px_#00000026] p-5 rounded-lg flex flex-col lg:flex-row gap-5">
      <div className="w-[90%]">
        <Skeleton className="w-full h-48 rounded-md" />
      </div>
      <div className="flex-1">
        <Skeleton className="w-24 h-6 mb-2" />
        <Skeleton className="w-full h-4 mb-1" />
        <Skeleton className="w-full h-4 mb-1" />
        <Skeleton className="w-3/4 h-4 mb-4" />
        <div className="flex items-center justify-between mt-5">
          <div>
            <Skeleton className="w-32 h-5 mb-1" />
            <Skeleton className="w-24 h-4" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="shadow-[0px_2px_15px_0px_#00000026] p-5 rounded-lg flex flex-col lg:flex-row gap-5 cursor-pointer hover:scale-105 transition-all duration-500">
      <div>
        <Image
          src={testimonial.user?.profileImage || "/testimonials.png"}
          alt={testimonial.user?.name}
          width={1000}
          height={1000}
          className="object-cover h-[200px] w-[200px] rounded-md"
        />
      </div>

      <div>
        <Rating style={{ maxWidth: 100 }} value={testimonial.rating} readOnly />
        <p className="text-black/75 mt-2">&quot;{testimonial.comment}&quot;</p>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <h1 className="font-medium text-lg">{testimonial.user?.name}</h1>
            <p className="text-sm text-black/70">{testimonial.service?.title || "Customer"}</p>
          </div>

          <div>
            <Image
              src="/qoute.png"
              alt="quote"
              width={1000}
              height={1000}
              className="h-8 w-8"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container !mb-24">
        <div className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto mb-8" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <TestimonialSkeleton />
          <div className="hidden lg:block">
            <TestimonialSkeleton />
          </div>
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const currentTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length]
  ];

  return (
    <div className="container !mb-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="text-sm text-black/85 mt-2 lg:max-w-xs mx-auto mb-8">
          What our clients say about us their success stories inspire everything we do
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {currentTestimonials.map((testimonial, index) => (
          <div key={index} className={index === 1 ? "hidden lg:block" : ""}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {testimonials.length > 2 && (
        <div className="mt-10">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={prevSlide}
              className="bg-gray-100 p-2 rounded-full border border-gray-400 hover:bg-white hover:text-primary hover:font-bold"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              className="bg-gray-100 p-2 rounded-full border border-gray-400 hover:bg-white hover:text-primary hover:font-bold"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;