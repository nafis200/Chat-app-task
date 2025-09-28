"use client";
import React from "react";
import PHform from "../form/PHform";
import PHinput from "../form/PHinput";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginProps = {
  onNext: (data: any) => void;
};

const Login = ({ onNext }: LoginProps) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const loginSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <PHform onSubmit={loginSubmit} resolver={zodResolver(loginSchema)}>
      <PHinput type="email" name="email" placeholder="Email" />
      <PHinput type="password" name="password" placeholder="Password" />
      <Button type="submit" className="w-full mt-2">
        Login
      </Button>
    </PHform>
  );
};

export default Login;
