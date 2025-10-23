import Image from "next/image";
import React from "react";

const AppTopBar = () => {
  return (
    <div className="h-[80px] w-full flex flex-col items-end justify-center px-8">
      <div className="flex items-center gap-3">
        <div>
          <h1>Profile Name</h1>
        </div>

        <div>
          <Image
            src={"/placeholder.jpg"}
            alt="placeholder.png"
            width={1000}
            height={1000}
            className="h-12 w-12 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;
