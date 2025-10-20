'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div>
        <Image
          src={"/logo.png"}
          alt="logo.png"
          width={1000}
          height={1000}
          className="w-[418px] h-[240px]"
        />
      </div>
    </Link>
  );
};

export default Logo;
