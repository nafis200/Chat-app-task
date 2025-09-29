"use client";
import React from "react";
import PHform from "../form/PHform";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PHinput } from "../form/PHinput";
import { AiFillApple } from "react-icons/ai";
import ImageUploader from "../form/ImageUploader";
type LoginProps = {
  onNext: (data: any) => void;
  defaultValues?: any;
};

const Login = ({ onNext, defaultValues }: LoginProps) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    images: z.array(z.any()).min(1, "At least one image is required"),
  });

  const loginSubmit = (data: any) => {
      const imageNames = data.images?.map((file: File) => file.name);
  console.log("Image Names:", imageNames);

  
  const finalData = {
    ...data,
    images: imageNames,
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
      <Button type="submit" className="w-full mt-2">
        Login
      </Button>
    </PHform>
  );
};

export default Login;
