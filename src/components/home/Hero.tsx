import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh)] flex items-center justify-center overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 lg:max-w-5xl mx-auto">
          Reliable Construction. Exceptional Results.
        </h1>
        <p className="text-lg lg:max-w-4xl mx-auto">
          om residential projects to large-scale developments, we deliver
          quality craftsmanship you can count on. Built on integrity, driven by
          excellence.
        </p>

        <Link href="/booking">
          <Button className="mt-5 px-5">
            Book Now <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
