import { Footer } from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-500px)]">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default layout;
