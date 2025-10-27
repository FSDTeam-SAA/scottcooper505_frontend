"use client";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettingsStore } from "@/zustand/settingsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  // Upload avatar mutation
  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile-info"] });
    },
    onError: (error) => {
      console.error("Error uploading avatar:", error);
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      uploadAvatarMutation.mutate(file);
    }
  };

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
        <div className="relative">
          <div
            className="relative cursor-pointer group"
            onClick={handleImageClick}
          >
            <Image
              src={
                profileInfo?.profileImage
                  ? profileInfo?.profileImage
                  : "/placeholder.jpeg"
              }
              alt="Profile Image"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit className="h-5 w-5 text-white" />
            </div>
          </div>

          {uploadAvatarMutation.isPending && (
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
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
