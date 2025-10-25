import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileVideoCamera, ImageUp, X } from "lucide-react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormValues } from "./add-project";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedVideo(null);

      form.setValue("image", imageUrl, { shouldValidate: true });
      form.setValue("video", "", { shouldValidate: true });
      form.clearErrors();
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file);
      setSelectedVideo(videoUrl);
      setSelectedImage(null);

      form.setValue("video", videoUrl, { shouldValidate: true });
      form.setValue("image", "", { shouldValidate: true });
      form.clearErrors();
    }
  };

  const clearSelection = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
      form.setValue("image", "", { shouldValidate: true });
    }
    if (selectedVideo) {
      URL.revokeObjectURL(selectedVideo);
      setSelectedVideo(null);
      form.setValue("video", "", { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      {/* Image Upload/Preview Section */}
      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem>
            <FormLabel>Add Image</FormLabel>
            <FormControl>
              <div className="border border-gray-400 p-5 rounded-lg">
                {selectedImage ? (
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <Image
                        src={selectedImage}
                        alt="Uploaded preview"
                        width={1000}
                        height={1000}
                        className="max-h-48 max-w-full object-contain rounded"
                      />
                      <div className="text-sm text-gray-600 mt-2">
                        Image Preview
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white border border-gray-300"
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
                      className="w-full h-52 text-base font-normal border-2 border-dashed border-gray-300 bg-transparent flex items-center justify-center"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                      type="button"
                    >
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <ImageUp style={{ height: "50px", width: "50px" }} />
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

      {/* Video Upload/Preview Section */}
      <FormField
        control={form.control}
        name="video"
        render={() => (
          <FormItem>
            <FormLabel>Or Add Video</FormLabel>
            <FormControl>
              <div className="border border-gray-400 p-5 rounded-lg">
                {selectedVideo ? (
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <video
                        src={selectedVideo}
                        controls
                        className="max-h-48 max-w-full object-contain rounded"
                      >
                        Your browser does not support the video tag.
                      </video>
                      <p className="text-sm text-gray-600 mt-2">
                        Video Preview
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full bg-white border border-gray-300"
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
                      className="w-full h-52 text-base font-normal border-2 border-dashed border-gray-300 bg-transparent flex items-center justify-center"
                      onClick={() =>
                        document.getElementById("video-upload")?.click()
                      }
                      type="button"
                    >
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <FileVideoCamera
                          style={{ height: "50px", width: "50px" }}
                        />
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
