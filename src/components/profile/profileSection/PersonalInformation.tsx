"use client";

import React, { useEffect, useMemo } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Cinput } from "../form/Cinput";
import { CPhoneInput } from "../form/CHPhoneInput";
import { Cselect } from "../form/Cselect";
import { PdfUploader } from "../form/PdfUploader";
import { Button } from "@/components/ui/button";

import countryList from "react-select-country-list";
import { allTimezones } from "react-timezone-select";
import languageOptions from "./language";
import { CinputSkills } from "../form/CinputSkills";

const personalSchema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
  username: z.string().min(1, "Username is required"),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  location: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  timezone: z.string().min(1, "Timezone is required"),
  language: z.string().min(1, "Preferred Language is required"),
  job_title: z.string().min(1, "Job Title is required"),
  company: z.string().min(1, "Company is required"),
  industry: z.string().min(1, "Industry is required"),
  experience_level: z.string().min(1, "Experience Level is required"),
  years_of_experience: z.coerce
    .number()
    .min(0, "Years of Experience is required"),
  skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "Skills are required"),
  resume_url: z.array(z.any()).min(1, "Resume / Portfolio upload is required"),
});

type PersonalFormValues = z.infer<typeof personalSchema>;

const PersonalInformation = () => {
  const countryOptions = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => {
        const flag = country.value
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(127397 + char.charCodeAt(0))
          );
        return { value: country.value, label: `${flag} ${country.label}` };
      });
  }, []);

  const timezoneOptions = useMemo(() => {
    return Object.entries(allTimezones).map(([key, label]) => ({
      value: key,
      label: label as string,
    }));
  }, []);

  const methods = useForm<any>({
    resolver: zodResolver(personalSchema),
    mode: "all",
    defaultValues: {
      full_name: "",
      username: "",
      phone: "",
      location: "",
      country: "",
      timezone: "",
      language: "",
      job_title: "",
      company: "",
      industry: "",
      experience_level: "",
      years_of_experience: 0,
      skills: [],
      resume_url: [],
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    control,
    setValue,
    watch,
  } = methods;

  useEffect(() => {
    trigger();
  }, [trigger]);

  const skills = watch("skills");

  const onSubmit: SubmitHandler<PersonalFormValues> = (data) => {
    console.log("Submitted data", data);
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Resume</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            This will be shown to companies to find you opportunities
          </p>
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 p-4 rounded-md space-y-1 mb-2">
              <h3 className="font-semibold">Your profile is missing:</h3>
              <ul className="list-disc list-inside text-sm">
                {Object.entries(errors).map(([key, value]: any) => (
                  <li key={key}>{value?.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-full lg:w-2/3">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1 - Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Cinput
                  control={control}
                  name="full_name"
                  label="Full Name*"
                  placeholder="Enter full name"
                />
                <Cinput
                  control={control}
                  name="username"
                  label="Username*"
                  placeholder="Enter username"
                />
              </div>

              {/* Row 2 - Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CPhoneInput
                  control={control}
                  name="phone"
                  label="Phone Number*"
                  placeholder="Enter phone number"
                  defaultCountry="us"
                />
                <Cinput
                  control={control}
                  name="location"
                  label="City*"
                  placeholder="Enter your city"
                />
              </div>

              {/* Row 3 - Country, Timezone, Language */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Cselect
                  control={control}
                  name="country"
                  label="Country*"
                  placeholder="Select your country"
                  options={countryOptions}
                />
                <Cselect
                  control={control}
                  name="timezone"
                  label="Timezone*"
                  placeholder="Select your timezone"
                  options={timezoneOptions}
                />
              </div>

              <div>
                <Cselect
                  control={control}
                  name="language"
                  label="Preferred Language*"
                  placeholder="Select your language"
                  options={languageOptions}
                />
              </div>

              {/* Row 4 - Professional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Cinput
                  control={control}
                  name="job_title"
                  label="Job Title*"
                  placeholder="Enter job title"
                />
                <Cinput
                  control={control}
                  name="company"
                  label="Company*"
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Cinput
                  control={control}
                  name="industry"
                  label="Industry*"
                  placeholder="Enter industry"
                />
                <Cselect
                  control={control}
                  name="experience_level"
                  label="Experience Level"
                  placeholder="Select your level"
                  options={[
                    { value: "entry", label: "Entry Level (0-2 years)" },
                    { value: "junior", label: "Junior (2-4 years)" },
                    { value: "mid", label: "Mid-Level (4-7 years)" },
                    { value: "senior", label: "Senior (7-10 years)" },
                    { value: "lead", label: "Lead/Principal (10+ years)" },
                    { value: "executive", label: "Executive/C-Level" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CinputSkills
                  name="skills"
                  label="Skills*"
                  placeholder="Type a skill and press Enter"
                  control={control} 
                  value={skills} 
                  setValue={setValue} 
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="text-sm font-medium">
                  Resume / Portfolio*
                </label>
                <div className="mt-2 border-2 border-dashed rounded-xl p-6 text-center">
                  <PdfUploader control={control} name="resume_url" />
                </div>
              </div>
             

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" className="px-6">
                  Save
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
