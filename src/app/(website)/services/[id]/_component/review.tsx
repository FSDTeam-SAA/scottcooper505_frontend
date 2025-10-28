"use client";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ReviewType {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  service: {
    _id: string;
    title: string;
  };
}

export const Review = () => {
  const { data: testimonials, isLoading } = useQuery<ReviewType[]>({
    queryKey: ["all-review"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`);
      const data = await res.json();
      return data?.data?.reviews || [];
    },
  });

  return (
    <div className="mt-20 bg-[#ede7f8] py-16">
      <div className="container flex flex-col items-center">
        <div className="space-y-8 w-full max-w-2xl">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-5 border-b border-black/25 pb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="w-[100px] h-5" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-1/2 h-4" />
                  <div className="space-y-1 mt-3">
                    <Skeleton className="w-[120px] h-4" />
                    <Skeleton className="w-[80px] h-4" />
                  </div>
                </div>
              </div>
            ))
          ) : testimonials && testimonials.length > 0 ? (
            testimonials.map((review) => (
              <div
                key={review._id}
                className="flex gap-5 border-b border-black/25 pb-4"
              >
                <div>
                  <Image
                    src={
                      review.user.profileImage
                        ? review.user.profileImage
                        : "/testimonials.png"
                    }
                    alt={review.user.name}
                    width={1000}
                    height={1000}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                </div>

                <div>
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={review.rating}
                    readOnly
                  />
                  <p className="lg:max-w-lg text-sm opacity-75 mt-2">
                    {review.comment}
                  </p>

                  <div className="mt-5">
                    <h1 className="font-medium">{review.user.name}</h1>
                    <p className="text-sm opacity-75">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center opacity-70">No reviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
