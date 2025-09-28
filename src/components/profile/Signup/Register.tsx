"use client";
import React from "react";
import PHform from "../form/PHform";
import PHinput from "../form/PHinput";
import { Button } from "@/components/ui/button";

type RegisterProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const Register = ({ onNext, onPrev, defaultValues }: RegisterProps) => {
  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <PHform onSubmit={onSubmit} defaultValues={defaultValues}>
      <PHinput type="text" name="name" placeholder="Full Name" />
      <PHinput type="text" name="address" placeholder="Address" />
      <PHinput type="password" name="postoffice" placeholder="postOffice" />
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
