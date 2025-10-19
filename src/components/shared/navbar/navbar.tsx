"use client";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/utils/navLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
  const pathname = usePathname();

  return (
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
                    className={`hover:bg-[#e7e7e7] p-2 px-4 rounded-3xl font-medium transition-all duration-500 ${
                      isActive && "bg-[#e7e7e7]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden md:block">
          <Link href={'/login'}>
            <Button>Login</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
