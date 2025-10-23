"use client";
import {
  BadgeIndianRupee,
  CookingPot,
  FolderKanban,
  HandPlatter,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: HandPlatter,
  },
  {
    title: "Booking History",
    url: "/dashboard/booking-history",
    icon: CookingPot,
  },
  {
    title: "My Wallet",
    url: "/dashboard/my-wallet",
    icon: BadgeIndianRupee,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="py-10 lg:border-r lg:border-black/40">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="h-[60px] w-[113px] mx-auto">
            {/* logo */}
            <Link href={"/"}>
              <div className="flex justify-center w-full mb-10">
                <Image
                  src={"/logo.png"}
                  alt="logo.png"
                  width={1000}
                  height={1000}
                  className="h-[60px] w-[113px] mx-auto"
                />
              </div>
            </Link>
          </SidebarGroupLabel>

          <SidebarGroupContent className="h-full flex flex-col justify-between">
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathName === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`font-medium hover:bg-gray-200 hover:text-primary ${
                        isActive && "bg-primary text-white hover:bg-primary hover:text-white"
                      } transition-all duration-200 `}
                      asChild
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            <SidebarFooter className="border-t border-gray-300">
              <button className="font-medium text-red-500 flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </SidebarFooter>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
