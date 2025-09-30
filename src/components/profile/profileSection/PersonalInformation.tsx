"use client";

import React, { useMemo } from "react";
import PHform from "../form/PHform";
import { PHinput } from "../form/PHinput";
import { PHselect } from "../form/PHselect";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { allTimezones } from "react-timezone-select";
import countryList from "react-select-country-list";
import languageOptions from "./language";
import { PHPhoneInput } from "../form/PHPhoneInput";
import { PHRichTextEditor } from "../form/PHRichTextEditor";

const timezoneOptions = Object.entries(allTimezones).map(([key, label]) => ({
  value: key,
  label: label as string,
}));

type PersonalInfoProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const personalSchema = z.object({
  username: z.string().min(3, "Username required"),
  full_name: z.string().min(3, "Full name required"),
  location: z.string(),
  timezone: z.string().optional(),
  language: z.string(),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
});

const PersonalInformation = ({
  onNext,
  onPrev,
  defaultValues,
}: PersonalInfoProps) => {
  const options = useMemo(() => {
    return countryList()
      .getData()
      .map((country: any) => {
        const flag = country.value
          .toUpperCase()
          .replace(/./g, (char: any) =>
            String.fromCodePoint(127397 + char.charCodeAt(0))
          );

        return {
          value: country.value,
          label: `${flag} ${country.label}`,
        };
      });
  }, []);

  return (
    <PHform
      onSubmit={onNext}
      resolver={zodResolver(personalSchema)}
      defaultValues={defaultValues}
    >
      <PHinput
        name="username"
        label="Username"
        placeholder="Enter your username"
      />
      <PHinput
        name="full_name"
        label="Full Name"
        placeholder="Enter your full name"
      />
       <PHPhoneInput
          name="phone"
          label="Phone"
          placeholder="Enter phone number"
          defaultCountry="us"
        />
      <PHselect
        name="location"
        label="Location"
        placeholder="Select location"
        options={options}
      />
      <PHselect
        name="timezone"
        label="Timezone"
        placeholder="Select timezone"
        options={timezoneOptions}
      />
      <PHselect
        name="language"
        label="Language"
        placeholder="Select language"
        options={languageOptions}
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

export default PersonalInformation;
