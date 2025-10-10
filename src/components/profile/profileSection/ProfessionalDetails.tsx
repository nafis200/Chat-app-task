"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Cform from "../form/CHform";
import { Cinput } from "../form/Cinput";
import { Cselect } from "../form/Cselect";



const professionalSchema = z.object({
  job_title: z.string().optional(),
  company: z.string().optional(),
  industry: z.string().optional(),
  experience_level: z.string().optional(),
  years_of_experience: z.coerce.number().optional(),
  skills: z.string().optional(),
});

const Submit = (data:any)=>{
  console.log("professional")
  console.log(data)
}

const ProfessionalDetails = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold dark:text-white text-gray-900 mb-2">
          Professional Information
        </h2>
        <p className="text-gray-600 text-lg dark:text-white">
          Tell us about your career journey
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-100 p-8 ">
        <Cform
          onSubmit={Submit}
          resolver={zodResolver(professionalSchema)}>
          {/* Career Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center dark:bg-black">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Current Position
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Cinput
                name="job_title"
                label="Job Title"
                placeholder="e.g. Senior Software Engineer"
              />
              <Cinput
                name="company"
                label="Company"
                placeholder="e.g. Tech Corp Inc."
              />
            </div>

            <Cinput
              name="industry"
              label="Industry"
              placeholder="e.g. Information Technology, Finance, Healthcare"
            />
          </div>

          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center dark:bg-black">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Experience
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Cselect
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
              <Cinput
                name="years_of_experience"
                type="number"
                label="Years of Experience"
                placeholder="e.g. 5"
              />
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center dark:bg-black">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Skills & Expertise
              </h3>
            </div>

            <Cinput
              name="skills"
              label="Skills"
              placeholder="e.g. JavaScript, React, Node.js, Project Management"
            />
            <p className="text-sm text-gray-500 -mt-4 dark:text-white">
              Separate multiple skills with commas
            </p>
          </div>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
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
    </div>
  );
};

export default ProfessionalDetails;
