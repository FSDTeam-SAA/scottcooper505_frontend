
"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Download, Loader2 } from "lucide-react";
import { useAvatarMutation, useProfileQuery } from "@/hooks/APiCalling";
import { useSession } from "next-auth/react";

const PersonalInfoAvata = () => {
  const [avatar, setAvatar] = useState("/assets/images/no-users.jpeg");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const getProfile = useProfileQuery(token as string);
  const avatarMutation = useAvatarMutation(token as string);

  // Set profile image from backend when component loads
  useEffect(() => {
    if (getProfile?.data?.data?.profileImage) {
      setAvatar(getProfile.data.data.profileImage);
    }
  }, [getProfile?.data?.data?.profileImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    avatarMutation.mutate(selectedFile);
  };

  return (
    <div className="flex flex-col items-center gap-3 py-6 px-4">
      <div className="relative border border-[#645949] rounded-full">
        <Image
          src={avatar}
          alt="Profile"
          width={200}
          height={200}
          className="w-[200px] h-[200px] object-cover rounded-full"
        />

        <div className="absolute bottom-4 right-3 flex gap-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          <Button
            size="sm"
            className="w-8 h-8 p-0 rounded-full bg-[#2c5d7c] hover:bg-[#1e4258]"
            title="Upload new image"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {selectedFile && (
        <Button
          onClick={handleSubmit}
          className="mt-4 md:mt-0 border bg-transparent border-[#4D0EB9] text-[#4D0EB9] hover:bg-[#4D0EB9] hover:text-white flex items-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Upload Image
          {avatarMutation.isPending && (
            <Loader2 className="w-4 h-4 ml-2 animate-spin" />
          )}
        </Button>
      )}
    </div>
  );
};

export default PersonalInfoAvata;
