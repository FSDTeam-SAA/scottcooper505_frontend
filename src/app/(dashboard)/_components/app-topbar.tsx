"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const AppTopBar = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data: profileInfo = {} } = useQuery({
    queryKey: ["profile-info"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      return data?.data;
    },
    enabled: !!token,
  });

  return (
    <div className="h-[80px] w-full flex flex-col items-end justify-center px-8">
      <div className="flex items-center gap-3">
        <div>
          <h1>{profileInfo?.name}</h1>
        </div>

        <div>
          <Image
            src={
              profileInfo?.profileImage
                ? profileInfo?.profileImage
                : "/placeholder.jpeg"
            }
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
