"use client";
import React from "react";
import { AddEditProject } from "../../add-project/_components/add-edit-project";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const Page = () => {
  const { id } = useParams();
  const session = useSession();
  const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const { data: projectDetails = {} } = useQuery({
    queryKey: ["project-details"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data?.data;
    },
  });

  return (
    <div>
      <AddEditProject projectDetails={projectDetails} id={id as string} />
    </div>
  );
};

export default Page;
