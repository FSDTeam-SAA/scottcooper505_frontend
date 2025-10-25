import z from "zod";

export const projectFormSchema = z
  .object({
    title: z.string().min(1, { message: "Please enter your project title." }),
    location: z
      .string()
      .min(1, { message: "Please specify the project location." }),
    areaType: z.string().min(1, { message: "Please select an area type." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long." }),

    image: z.string().optional(),
    video: z.string().optional(),
  })
  .refine((data) => data.image || data.video, {
    message: "Please upload either an image or a video.",
    path: ["image"],
  });
