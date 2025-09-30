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
import { PHtextarea } from "../form/PHtextarea";
import { PHselect } from "../form/PHselect";
import { PHcheckbox } from "../form/PHcheckbox";
import { PdfUploader } from "../form/PdfUploader";

type LoginProps = {
  onNext: (data: any) => void;
  defaultValues?: any;
};

const Login = ({ onNext, defaultValues }: LoginProps) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    images: z
      .array(z.any())
      .min(1, "At least one image is required")
      .refine(
        (files) =>
          Array.from(files).every((file: File | string) => {
            if (file instanceof File) {
              return ["image/png", "image/jpeg", "image/jpg"].includes(
                file.type
              );
            }
            return true;
          }),
        "Only PNG or JPG images are allowed"
      )
      .refine(
        (files) =>
          Array.from(files).every((file: File | string) => {
            if (file instanceof File) {
              return file.size <= 3 * 1024 * 1024;
            }
            return true;
          }),
        "Each image must be smaller than 3MB"
      ),

    pdf: z
      .array(z.any())
      .min(1, "At least one document is required")
      .refine(
        (files) =>
          Array.from(files).every((file: File | string) => {
            if (file instanceof File) {
              return [
                "application/pdf",
                "application/msword",
                "text/plain",
              ].includes(file.type);
            }
            return true;
          }),
        "Only PDF, DOC, or TXT files are allowed"
      )
      .refine(
        (files) =>
          Array.from(files).every((file: File | string) => {
            if (file instanceof File) {
              return file.size <= 5 * 1024 * 1024; 
            }
            return true;
          }),
        "Each document must be smaller than 5MB"
      ),

    bio: z.string().min(10, "Bio must be at least 10 characters"),
    terms: z.boolean().refine((val) => val === true, "You must accept terms"),
    country: z.string().min(1, "Country is required"),
  });

  const loginSubmit = (data: any) => {
    const pdfFile = data.pdf?.[0];
    console.log(data.pdf);
    onNext({
      ...data,
      images: data.images,
      pdf: data.pdf,
    });
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
      <PHtextarea
        name="bio"
        label="Your Bio"
        placeholder="Write something about yourself..."
        rows={5}
      />
      <PHselect
        name="country"
        label="Select Country"
        placeholder="Choose a country"
        options={[
          { value: "bd", label: "Bangladesh" },
          { value: "in", label: "India" },
          { value: "us", label: "United States" },
        ]}
      />
      <PHcheckbox name="terms" label="I agree to the terms and conditions" />
      <PdfUploader name="pdf" />
      <Button type="submit" className="w-full mt-2">
        Login
      </Button>
    </PHform>
  );
};

export default Login;
