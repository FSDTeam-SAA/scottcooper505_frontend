import Image from "next/image";
import React from "react";

export const WhyChoose = () => {
  const items = [
    {
      icon: "/choose-1.png",
      title: "10-Year Labor Warranties",
      desc: "Our work is backed by industry-leading warranties that protect your investment for a decade.",
    },
    {
      icon: "/choose-2.png",
      title: "Licensed & Insured",
      desc: "We maintain all required licenses and insurance for your complete protection and peace of mind.",
    },
    {
      icon: "/choose-3.png",
      title: "Family-Owned & Houston-Based",
      desc: "We're proud to be a local, family-operated business serving our Houston community.",
    },
    {
      icon: "/choose-4.png",
      title: "Fast Drone-Based Assessments",
      desc: "Our advanced drone technology provides quick, accurate inspections without ladder climbing",
    },
  ];

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Why Choose Rage Away, LLC</h1>
        <p className="text-black/75 mt-2 mb-8">
          Delivering quality construction with integrity, precision, and
          expertise you can rely on.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-14">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={"/why-choose.jpg"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-[500px] w-[700px] rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer"
          />
        </div>

        <div className="h-[500px] flex-1 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 shadow-[0px_4px_32px_0px_#00000029] rounded-md lg:flex gap-5 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="w-[50%]">
                <Image
                  src={item.icon}
                  alt="icon.png"
                  width={1000}
                  height={1000}
                  className="h-10 w-10"
                />
              </div>

              <div>
                <h1 className="text-lg font-semibold mb-2">{item.title}</h1>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
