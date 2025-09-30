"use client";

import React from "react";
import PHform from "../form/PHform";
import { PHinput } from "../form/PHinput";
import { PHselect } from "../form/PHselect";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ProfessionalProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const professionalSchema = z.object({
  job_title: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  experience_level: z.string().optional(),
  years_of_experience: z.number().optional(),
  skills: z.string().optional(),
});

const ProfessionalDetails = ({ onNext, onPrev, defaultValues }: ProfessionalProps) => {
  return (
    <PHform
      onSubmit={onNext}
      resolver={zodResolver(professionalSchema)}
      defaultValues={defaultValues}
    >
      <PHinput name="job_title" label="Job Title" placeholder="Enter your job title" />
      <PHinput name="company" label="Company" placeholder="Your company name" />
      <PHinput name="industry" label="Industry" placeholder="Industry type" />
      <PHselect
        name="experience_level"
        label="Experience Level"
        placeholder="Select level"
        options={[
          { value: "junior", label: "Junior" },
          { value: "mid", label: "Mid" },
          { value: "senior", label: "Senior" },
        ]}
      />
      <PHinput name="years_of_experience" type="number" label="Years of Experience" placeholder="e.g. 3" />
      <PHinput name="skills" label="Skills" placeholder="Comma separated skills" />
      <div className="flex justify-between mt-2">
        {onPrev && <Button variant="secondary" onClick={onPrev}>Previous</Button>}
        <Button type="submit">Next</Button>
      </div>
    </PHform>
  );
};

export default ProfessionalDetails;
