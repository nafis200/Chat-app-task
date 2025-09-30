"use client";

import React from "react";
import PHform from "../form/PHform";
import { PHinput } from "../form/PHinput";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type SecurityProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const securitySchema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must be match",
  });

const SecurityAccount = ({ onNext, onPrev, defaultValues }: SecurityProps) => {
  return (
    <PHform
      onSubmit={(data) => {
        onNext(data);
      }}
      resolver={zodResolver(securitySchema)}
      defaultValues={defaultValues}
    >
      <PHinput
        name="email"
        type="email"
        label="Email"
        placeholder="Enter email"
      />
      <PHinput
        name="password"
        type="password"
        label="Password"
        placeholder="Enter password"
      />
      <PHinput
        name="confirm_password"
        type="password"
        label="Confirm Password"
        placeholder="Confirm password"
      />

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

export default SecurityAccount;
