"use client";
import React from "react";
import PHform from "../form/PHform";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PHinput } from "../form/PHinput";
import { AiFillApple } from "react-icons/ai";

import { FileUploader } from "../form/FileUploader";
import ImageUploader from "../form/ImageUploader";
type LoginProps = {
  onNext: (data: any) => void;
  defaultValues?: any;
};

const Login = ({ onNext, defaultValues }: LoginProps) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    // Images validation
    images: z
      .array(z.any())
      .min(1, "At least one image is required"),
      // .refine(
      //   (files) =>
      //     Array.from(files).every((file: File) =>
      //       ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
      //     ),
      //   "Only PNG or JPG images are allowed"
      // )
      // .refine(
      //   (files) =>
      //     Array.from(files).every((file: File) => file.size <= 20 * 1024 * 1024),
      //   "Each image must be smaller than 3MB"
      // ),

    pdf: z
      .array(z.any())
      .min(1, "At least one document is required")
      .refine(
        (files) =>
          Array.from(files).every((file: File) =>
            ["application/pdf", "application/msword", "text/plain"].includes(
              file.type
            )
          ),
        "Only PDF, DOC, or TXT files are allowed"
      )
      .refine(
        (files) =>
          Array.from(files).every(
            (file: File) => file.size <= 10 * 1024 * 1024
          ),
        "Each document must be smaller than 5MB"
      ),
  });

 const loginSubmit = (data: any) => {
  const imageNames = data.images
    ?.map((file: File | string) => (file instanceof File ? file.name : file))
    .filter(Boolean); // undefined বা empty string remove

  console.log("Image Names:", imageNames);
  console.log(data);

  const pdfFile = data.pdf?.[0];

  const finalData = {
    ...data,
    images: imageNames,
    pdf: pdfFile,
  };
  
  onNext(finalData);
};


  return (
    <PHform
      onSubmit={loginSubmit}
      resolver={zodResolver(loginSchema)}
      defaultValues={defaultValues}
    >
      <PHinput
        icon={AiFillApple}
        label="email"
        type="email"
        name="email"
        placeholder="Email"
      />
      <PHinput type="password" name="password" placeholder="Password" />
      <ImageUploader
        name="images"
        label="Upload Profile Images"
        size="medium"
      />
      <FileUploader name="pdf" />
      <Button type="submit" className="w-full mt-2">
        Login
      </Button>
    </PHform>
  );
};

export default Login;
