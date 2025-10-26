"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileVideoCamera, ImageUp, X } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "./add-edit-project";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  form: UseFormReturn<ProjectFormValues>;
}

const UploadImgVideo = ({ form }: Props) => {
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [selectedVideoPreview, setSelectedVideoPreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImagePreview(imageUrl);
      setSelectedVideoPreview(null);

      form.setValue("images", file, { shouldValidate: true });
      form.setValue("videos", undefined, { shouldValidate: true });
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file);
      setSelectedVideoPreview(videoUrl);
      setSelectedImagePreview(null);

      form.setValue("videos", file, { shouldValidate: true });
      form.setValue("images", undefined, { shouldValidate: true });
    }
  };

  const clearSelection = () => {
    if (selectedImagePreview) {
      URL.revokeObjectURL(selectedImagePreview);
      setSelectedImagePreview(null);
      form.setValue("images", undefined, { shouldValidate: true });
    }
    if (selectedVideoPreview) {
      URL.revokeObjectURL(selectedVideoPreview);
      setSelectedVideoPreview(null);
      form.setValue("videos", undefined, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      {/* Image Upload */}
      <FormField
        control={form.control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel>Add Image</FormLabel>
            <FormControl>
              <div className="border border-gray-400 p-5 rounded-lg">
                {selectedImagePreview ? (
                  <div className="relative">
                    <Image
                      src={selectedImagePreview}
                      alt="Preview"
                      width={1000}
                      height={1000}
                      className="max-h-48 max-w-full object-contain rounded"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white border"
                      onClick={clearSelection}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="w-full h-52 border-2 border-dashed border-gray-300 flex items-center justify-center"
                      type="button"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <ImageUp style={{ height: "50px", width: "50px" }} />
                        <span>Upload Image</span>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Video Upload */}
      <FormField
        control={form.control}
        name="videos"
        render={() => (
          <FormItem>
            <FormLabel>Or Add Video</FormLabel>
            <FormControl>
              <div className="border border-gray-400 p-5 rounded-lg">
                {selectedVideoPreview ? (
                  <div className="relative">
                    <video
                      src={selectedVideoPreview}
                      controls
                      className="max-h-48 max-w-full object-contain rounded"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white border"
                      onClick={clearSelection}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <input
                      type="file"
                      id="video-upload"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="w-full h-52 border-2 border-dashed border-gray-300 flex items-center justify-center"
                      type="button"
                      onClick={() =>
                        document.getElementById("video-upload")?.click()
                      }
                    >
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <FileVideoCamera style={{ height: "50px", width: "50px" }} />
                        <span>Upload Video</span>
                      </div>
                    </Button>
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UploadImgVideo;
