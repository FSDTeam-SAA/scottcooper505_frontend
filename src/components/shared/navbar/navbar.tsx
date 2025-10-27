"use client";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/utils/navLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAtTop, setIsAtTop] = useState(true);

  const { data: session } = useSession();
  const user = session?.user as
    | {
        name?: string;
        email?: string;
        profileImage?: string;
        accessToken?: string;
        role?: string;
      }
    | undefined;

  const role = user?.role;

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        pathname === "/" && isAtTop ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo.png"
              width={1000}
              height={1000}
              className="h-[72px] w-[125px]"
            />
          </Link>

          {/* Desktop navigation */}
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
                        ${
                          pathname === "/" && isAtTop && !isActive
                            ? "text-primary"
                            : "text-primary"
                        }
                      `}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Auth section */}
          <div className="hidden md:block">
            {!user ? (
              <Link href={"/login"}>
                <Button>Login</Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <Image
                      src={
                        user?.profileImage
                          ? user?.profileImage
                          : "/placeholder.jpeg"
                      }
                      alt="placeholder.png"
                      width={1000}
                      height={1000}
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {role === "ADMIN" && (
                    <DropdownMenuItem
                      className="cursor-pointer font-semibold"
                      onClick={() => router.push("/dashboard")}
                    >
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer font-semibold"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer font-semibold"
                    onClick={() => router.push("/my-booking")}
                  >
                    My Booking
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                    className="text-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
