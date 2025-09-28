"use client";
import React from "react";
import PHform from "../form/PHform";
import PHinput from "../form/PHinput";
import { Button } from "@/components/ui/button";

type RegisterProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
};

const Register = ({ onNext, onPrev }: RegisterProps) => {
  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <PHform onSubmit={onSubmit}>
      <PHinput type="text" name="name" placeholder="Full Name" />
      <PHinput type="email" name="email" placeholder="Email" />
      <PHinput type="password" name="password" placeholder="Password" />
      <div className="flex justify-between mt-2">
        {onPrev && (
          <Button variant="secondary" onClick={onPrev}>
            Previous
          </Button>
        )}
        <Button type="submit">Next</Button>
      </div>
    </PHform>
  );
};

export default Register;
