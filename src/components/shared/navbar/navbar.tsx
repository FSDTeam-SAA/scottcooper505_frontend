"use client";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/utils/navLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isAtTop ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link href={"/"}>
            <div>
              <Image
                src={"/logo.png"}
                alt="logo.png"
                width={1000}
                height={1000}
                className="h-[72px] w-[125px]"
              />
            </div>
          </Link>

          {/* for desktop */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-2 text-primary">
              {navLinks.map((item, index) => {
                const isActive = item.link === pathname;

                return (
                  <li key={index}>
                    <Link
                      href={item.link}
                      className={`
                        p-2 px-4 rounded-3xl font-medium transition-all duration-500 
                        hover:bg-[#e7e7e7] 
                        ${isActive ? "bg-[#e7e7e7] text-primary" : ""}
                        ${isAtTop && !isActive ? "text-white" : "text-primary"}
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden md:block">
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
