"use client";

import { Button } from "@/components/ui/button";
// import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, {  useRef, useState } from "react";
// import { toast } from "sonner";

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    avatar: {
      public_id: string;
      url: string;
    };
    _id: string;
    name: string;
    email: string;
    lastActive: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    city: string;
    phone: string;
    state: string;
    street: string;
    zip: string;
    dob: string;
  };
}

const PersonalInfoAvata = () => {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5OTA0MDczLCJleHAiOjE3NTk5OTA0NzN9.mn6lRS1vsu-PjKQO0KRFZLAY135W9YRsEVc1R6Z5nCo";
//   const queryClient = new QueryClient();

  const [avatar, setProfileImage] = useState("/assets/images/no-users.jpeg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // profile get api
//   const { data } = useQuery<ProfileResponse>({
//     queryKey: ["profile"],
//     queryFn: () =>
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((res) => res.json()),
//   });

  //   console.log(data?.data);

  // update api
//   const { mutate, isPending } = useMutation({
//     mutationKey: ["update-profile-image"],
//     mutationFn: async (formData: FormData) => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );
//       if (!res.ok) throw new Error("Upload failed");
//       return res.json();
//     },
//     onSuccess: (data) => {
//       toast.success(data?.message || "Profile image updated successfully!");
//       queryClient.invalidateQueries({
//         queryKey: ["profile-img"],
//       });
//       console.log("Response:", data);
//     },
//     onError: (error) => {
//       toast.error("Upload failed");
//       console.error(error);
//     },
//   });

  // delete api
  // const { mutate: deleteImage } = useMutation({
  //   mutationKey: ["delete-profile-image"],
  //   mutationFn: async () => {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete-profile`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (!res.ok) throw new Error("Delete failed");
  //     return res.json();
  //   },
  //   onSuccess: (data) => {
  //     if (data?.success) {
  //       toast.success(data?.message || "Profile image deleted successfully");
  //       return;
  //     }
  //     toast.error(data?.message || "Something went wrong");

  //     queryClient.invalidateQueries({
  //       queryKey: ["profile-img"],
  //     });
  //     console.log("Response:", data);
  //   },
  // });

//   useEffect(() => {
//     const image = data?.data?.avatar?.url;
//     if (image) {
//       setProfileImage(image);
//     }
//   }, [data?.data?.avatar?.url]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file to backend
    const formData = new FormData();
    formData.append("avatar", file, file.name);
    console.log(avatar)
    // mutate(formData);
  };

  // const handleDelete = () => {
  //   deleteImage();
  // };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 py-6 md:py-7 lg:py-8 px-4 md:px-5 lg:px-6">
      <div className="relative border border-[#645949] rounded-full">
        <div className="">
          <Image
            src={avatar}
            alt="Profile"
            width={528}
            height={528}
            className="w-[200px] h-[200px] object-cover rounded-full"
          />
        </div>

        <div className="absolute -bottom-2 -right-2 flex gap-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          {/* Camera Icon (Choose & Upload Image) */}
          <Button
            size="sm"
            className="w-8 h-8 p-0 rounded-full bg-[#2c5d7c] hover:bg-[#1e4258]"
            title="Upload new image"
            onClick={() => fileInputRef.current?.click()}
            // disabled={isPending}
          >
            <Camera className="w-4 h-4" />
          </Button>

          {/* Trash Icon (Reset image) */}
          {/*
          <Button
            size="sm"
            className="w-8 h-8 p-0 rounded-full bg-red-500 hover:bg-red-600"
            title="Delete current image"
            onClick={handleDelete}
          > 
            <Trash2 className="w-4 h-4" />
          </Button>
*/}
        </div>
      </div>
      {/* <div className="h-full flex flex-col items-center md:items-start justify-center">
        <h4 className="text-xl font-medium leading-[120%] text-[#111827]">
          {data?.data?.name}
        </h4>
        <p className="text-base font-normal leading-[120%] text-[#282828] pt-3">
          {data?.data?.email}
        </p>
      </div> */}
    </div>
  );
};

export default PersonalInfoAvata;
