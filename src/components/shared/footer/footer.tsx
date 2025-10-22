import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="pt-16 pb-5 bg-[#e7e7e7]">
      <div className="border-b border-gray-400/50 pb-5">
        <div className="container">
          <div className="grid grid-cols-4 gap-14">
            <div className="col-span-2">
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

              <div className="mt-4">
                <h1>Rage Away</h1>
                <p>
                  Delivering expert construction solutions with precision and
                  reliability.
                </p>

                <Button className="mt-4">
                  Book Now <ArrowRight />
                </Button>
              </div>
            </div>

            <div className="col-span-1">
              <h1 className="font-medium text-xl mb-4">Contact Us</h1>
              <h1 className="flex items-center gap-2 hover:underline hover:text-primary transition-all cursor-pointer">
                <Phone className="text-primary h-5 w-5" /> 731-592-1892
              </h1>
              <h1 className="flex items-center gap-2 my-2 hover:underline hover:text-primary transition-all cursor-pointer">
                <Mail className="text-primary h-5 w-5" />{" "}
                rageawaysession@yahoo.com
              </h1>
              <h1 className="flex items-center gap-2 hover:underline hover:text-primary transition-all cursor-pointer">
                <Globe className="text-primary h-5 w-5" /> www.rageaway.com
              </h1>
            </div>

            <div className="col-span-1">
              <h1 className="font-medium text-xl mb-4">Quick Links</h1>
              <Link
                href={"/services"}
                className="mb-2 hover:underline hover:text-primary transition-all"
              >
                <h1>Services</h1>
              </Link>
              <Link
                href={"/projects"}
                className="hover:underline hover:text-primary transition-all"
              >
                <h1>Projects page</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-between mt-5 text-sm">
        <h1>© 2025 Rage Away. All rights reserved.</h1>

        <div className="flex items-center gap-2">
          <Link href={"/privacy-policy"} className="hover:text-primary hover:underline">Privacy Policy</Link>
          <Link href={"/terms-conditions"} className="hover:text-primary hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};
