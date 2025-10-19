"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/utils/navLinks";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const MobileNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={closeSheet}>
                <Image
                  src={"/logo.png"}
                  alt="logo.png"
                  width={1000}
                  height={1000}
                  className="h-[60px] w-[100px]"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeSheet}
                className="h-9 w-9"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1">
              <ul className="space-y-4">
                {navLinks.map((item, index) => {
                  const isActive = item.link === pathname;

                  return (
                    <li key={index}>
                      <Link
                        href={item.link}
                        onClick={closeSheet}
                        className={`block p-3 rounded-lg font-medium transition-all duration-300 text-center ${
                          isActive
                            ? "bg-[#e7e7e7] text-primary"
                            : "hover:bg-[#f5f5f5]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Login button */}
            <div className="pt-6 border-t">
              <Link href={"/login"}>
                <Button className="w-full" onClick={closeSheet}>
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
