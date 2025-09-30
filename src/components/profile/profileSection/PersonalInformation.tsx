"use client";

import React from "react";
import PHform from "../form/PHform";
import { PHinput } from "../form/PHinput";
import { PHselect } from "../form/PHselect";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PersonalInfoProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const personalSchema = z.object({
  username: z.string().min(3, "Username required"),
  full_name: z.string().min(3, "Full name required"),
  phone: z.string(),
  location: z.string(),
  timezone: z.string().optional(),
  language: z.string(),
});

const PersonalInformation = ({ onNext, onPrev, defaultValues }: PersonalInfoProps) => {
  return (
    <PHform
      onSubmit={onNext}
      resolver={zodResolver(personalSchema)}
      defaultValues={defaultValues}
    >
      <PHinput name="username" label="Username" placeholder="Enter your username" />
      <PHinput name="full_name" label="Full Name" placeholder="Enter your full name" />
      <PHinput name="phone" label="Phone" placeholder="Enter phone number" />
      <PHinput name="location" label="Location" placeholder="Enter your location" />
      <PHselect
        name="timezone"
        label="Timezone"
        placeholder="Select timezone"
        options={[{ value: "UTC", label: "UTC" }, { value: "GMT+6", label: "GMT+6" }]}
      />
      <PHselect
        name="language"
        label="Language"
        placeholder="Select language"
        options={[{ value: "en", label: "English" }, { value: "bn", label: "Bangla" }]}
      />

      <div className="flex justify-between mt-2">
        {onPrev && <Button variant="secondary" onClick={onPrev}>Previous</Button>}
        <Button type="submit">Next</Button>
      </div>
    </PHform>
  );
};

export default PersonalInformation;
