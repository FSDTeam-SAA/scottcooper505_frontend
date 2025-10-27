"use client";
import React from "react";
import { SettingsHeader } from "./settings-header";
import { SettingsForm } from "./settings-form";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import ChangePassword from "./change-password";

const Settings = () => {
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data: profileInfo = {}, isLoading } = useQuery({
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
    <div className="space-y-8">
      <SettingsHeader profileInfo={profileInfo} isLoading={isLoading} />
      <SettingsForm profileInfo={profileInfo} />
      <ChangePassword />
    </div>
  );
};

export default Settings;
