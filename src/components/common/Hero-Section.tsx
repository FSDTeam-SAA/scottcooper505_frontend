import React from 'react'

const HeroSection = ({ img, title, desc }: { img: string; title: string; desc: string }) => {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="h-[528px] w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center px-4"
    >
      <h1 className="text-2xl md:text-4xl lg:text-[48px] font-bold text-white leading-[120%]">
        {title}
      </h1>
      <p className="text-base md:text-lg font-normal text-[#E7E7E7] leading-[120%] pt-1 md:pt-2">
        {desc}
      </p>
    </div>
  )
}

export default HeroSection
