import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import React from "react";

export const Review = () => {
  return (
    <div className="mt-20 bg-[#ede7f8] py-16 ">
      <div className="container flex flex-col items-center">
        <div className="space-y-8">
          <div className="flex gap-5 border-b border-black/25 pb-2">
            <div>
              <Image
                src={"/testimonials.png"}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover w-12 h-12 rounded-full"
              />
            </div>

            <div>
              <Rating style={{ maxWidth: 100 }} value={5} readOnly />
              <p className="lg:max-w-lg text-sm opacity-75 mt-2">You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.</p>

              <div className="mt-5">
                <h1 className="font-medium">Kristin Watson</h1>
                <p className="text-sm opacity-75">March 14, 2021</p>
              </div>
            </div>
          </div>

          <div className="flex gap-5 border-b border-black/25 pb-2">
            <div>
              <Image
                src={"/testimonials.png"}
                alt="img.png"
                width={1000}
                height={1000}
                className="object-cover w-12 h-12 rounded-full"
              />
            </div>

            <div>
              <Rating style={{ maxWidth: 100 }} value={5} readOnly />
              <p className="lg:max-w-lg text-sm opacity-75 mt-2">You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.</p>

              <div className="mt-5">
                <h1 className="font-medium">Kristin Watson</h1>
                <p className="text-sm opacity-75">March 14, 2021</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
