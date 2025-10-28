"use client";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const items = [
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "After Hurricane Harvey damaged our roof, Borrelli Roofing was incredible. They handled our insurance claim seamlessly and installed our new roof in just two days. The quality of work was outstanding Their repair work was just as impressive.",
      name: "Sarah M.",
      title: "Customer",
    },
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "Second testimonial - They handled our insurance claim seamlessly and installed our new roof in just two days.",
      name: "John D.",
      title: "Homeowner",
    },
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "Third testimonial - The quality of work was outstanding Their repair work was just as impressive.",
      name: "Emily R.",
      title: "Customer",
    },
    {
      img: "/testimonials.png",
      rating: 5,
      review:
        "Fourth testimonial - They handled our insurance claim seamlessly and installed our new roof in just two days.",
      name: "Michael T.",
      title: "Business Owner",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= items.length - 2) {
        return 0; // Go back to first pair
      }
      return prevIndex + 2; // Move to next pair
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return items.length - 2; // Go to last pair
      }
      return prevIndex - 2; // Move to previous pair
    });
  };

  return (
    <div className="container !mb-24">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="text-sm text-black/85 mt-2 lg:max-w-xs mx-auto mb-8">
          What our clients say about us their success stories inspire everything
          we do
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* First testimonial - always visible */}
          <div
            className="shadow-[0px_2px_15px_0px_#00000026] p-5 rounded-lg flex flex-col lg:flex-row gap-5 cursor-pointer hover:scale-105 transition-all duration-500"
          >
            <div className="w-[90%]">
              <Image
                src={items[currentIndex].img}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover h-full rounded-md"
              />
            </div>

            <div>
              <Rating style={{ maxWidth: 100 }} value={items[currentIndex].rating} readOnly />
              <p className="text-black/75 mt-2">&quot;{items[currentIndex].review}&quot;</p>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <h1 className="font-medium text-lg">{items[currentIndex].name}</h1>
                  <p className="text-sm text-black/70">{items[currentIndex].title}</p>
                </div>

                <div>
                  <Image
                    src={"/qoute.png"}
                    alt="img.png"
                    width={1000}
                    height={1000}
                    className="h-8 w-8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Second testimonial - only on large screens */}
          <div className="hidden lg:block">
            <div
              className="shadow-[0px_2px_15px_0px_#00000026] p-5 rounded-lg flex flex-col lg:flex-row gap-5 cursor-pointer hover:scale-105 transition-all duration-500"
            >
              <div className="w-[90%]">
                <Image
                  src={items[currentIndex + 1]?.img || items[0].img}
                  alt="img.png"
                  width={1000}
                  height={1000}
                  className="object-cover h-full rounded-md"
                />
              </div>

              <div>
                <Rating style={{ maxWidth: 100 }} value={items[currentIndex + 1]?.rating || items[0].rating} readOnly />
                <p className="text-black/75 mt-2">&quot;{items[currentIndex + 1]?.review || items[0].review}&quot;</p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <h1 className="font-medium text-lg">{items[currentIndex + 1]?.name || items[0].name}</h1>
                    <p className="text-sm text-black/70">{items[currentIndex + 1]?.title || items[0].title}</p>
                  </div>

                  <div>
                    <Image
                      src={"/qoute.png"}
                      alt="img.png"
                      width={1000}
                      height={1000}
                      className="h-8 w-8"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default Testimonials;