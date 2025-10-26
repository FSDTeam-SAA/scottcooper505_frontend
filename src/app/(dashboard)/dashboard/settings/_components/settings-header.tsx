"use client";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsStore } from "@/zustand/settingsStore";

interface ProfileType {
  name: string;
  email: string;
  profileImage: string;
}

interface Props {
  profileInfo: ProfileType;
  isLoading: boolean;
}

export const SettingsHeader = ({ profileInfo, isLoading }: Props) => {
  const { setShowSubmit } = useSettingsStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <Image
            src={
              profileInfo?.profileImage
                ? profileInfo?.profileImage
                : "/placeholder.jpeg"
            }
            alt="img.png"
            width={1000}
            height={1000}
            className="h-20 w-20 rounded-full"
          />
        </div>

        <div>
          <h1 className="font-semibold text-lg">{profileInfo?.name}</h1>
          <p>{profileInfo?.email}</p>
        </div>
      </div>

      <div>
        <Button onClick={() => setShowSubmit(true)}>
          <Edit className="mr-2 h-4 w-4" /> Update Profile
        </Button>
      </div>
    </div>
  );
};
