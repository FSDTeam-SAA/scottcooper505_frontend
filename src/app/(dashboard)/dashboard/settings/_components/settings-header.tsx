import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";

export const SettingsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Image
            src={"/placeholder.jpeg"}
            alt="img.png"
            width={1000}
            height={1000}
            className="h-20 w-20 rounded-full"
          />
        </div>

        <div>
          <h1 className="font-semibold text-lg">Profile Name</h1>
          <p>email@gmail.com</p>
        </div>
      </div>

      <div>
        <Button>
          <Edit /> Update Profile
        </Button>
      </div>
    </div>
  );
};
