"use client";

import React, { useMemo } from "react";
import PHform from "../form/CHform";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { allTimezones } from "react-timezone-select";
import countryList from "react-select-country-list";
import languageOptions from "./language";
import { User, Globe, Phone } from "lucide-react";
import Cform from "../form/CHform";
import { Cinput } from "../form/Cinput";
import { CPhoneInput } from "../form/CHPhoneInput";
import { Cselect } from "../form/Cselect";

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

const PersonalInformation = ({ onNext, defaultValues }: PersonalInfoProps) => {
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
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Let's get to know you better
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
        <Cform
          onSubmit={onNext}
          resolver={zodResolver(personalSchema)}
          defaultValues={defaultValues}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-black flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Identity
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Cinput
                name="username"
                label="Username"
                placeholder="e.g. johndoe123"
              />
              <Cinput
                name="full_name"
                label="Full Name"
                placeholder="e.g. John Doe"
              />
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center dark:bg-black">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Contact
              </h3>
            </div>

            <CPhoneInput
              name="phone"
              label="Phone Number"
              placeholder="Enter phone number"
              defaultCountry="us"
            />
          </div>

          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center dark:bg-black">
                <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Location & Preferences
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Cselect
                name="location"
                label="Location"
                placeholder="Select your country"
                options={options}
              />
              <Cselect
                name="timezone"
                label="Timezone"
                placeholder="Select your timezone"
                options={timezoneOptions}
              />
            </div>

            <Cselect
              name="language"
              label="Preferred Language"
              placeholder="Select your language"
              options={languageOptions}
            />
          </div>
          <div className="flex items-center justify-end mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="submit"
              className="px-8 py-2.5 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Continue
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </Cform>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <div className="w-8 h-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default PersonalInformation;
