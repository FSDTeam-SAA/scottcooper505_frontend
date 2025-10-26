import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/app-sidebar";
import AppTopBar from "./_components/app-topbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="w-full">
          <div className="relative">
            <div className="absolute translate-y-1/2">
              <SidebarTrigger />
            </div>
          </div>
          <header className="bg-white">
            <AppTopBar />
          </header>
          <div className="w-full">
            <div>{children}</div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
