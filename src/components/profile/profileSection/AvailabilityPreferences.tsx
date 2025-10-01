"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, MessageSquare, CheckCircle2, Sparkles } from "lucide-react";
import Cform from "../form/CHform";
import { Ccheckbox } from "../form/Ccheckbox";
import { CRichTextEditor } from "../form/CRichTextEditor";

type AvailabilityProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const availabilitySchema = z.object({
  is_available_for_mock_interviews: z.boolean(),
  description: z.string().optional(),
});

const AvailabilityPreferences = ({
  onNext,
  onPrev,
  defaultValues,
}: AvailabilityProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-700 mb-4 shadow-lg">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Availability & Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Let others know your availability and interests
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
        <Cform
          onSubmit={onNext}
          resolver={zodResolver(availabilitySchema)}
          defaultValues={defaultValues}
        >
          {/* Availability Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Interview Availability
              </h3>
            </div>

            {/* Checkbox Card */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-violet-200 dark:border-violet-800">
              <Ccheckbox
                name="is_available_for_mock_interviews"
                label="Available for mock interviews"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-6">
                Enable this to let others know you're open to participating in
                practice interview sessions
              </p>
            </div>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">
                    Skill Building
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Practice and improve your interview skills
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">
                    Networking
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Connect with professionals in your field
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-1">
                    Flexibility
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Set your own schedule and availability
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                About You
              </h3>
            </div>

            <CRichTextEditor
              name="description"
              label="Description"
              className="w-[16rem] sm:w-[16rem] md:w-[42rem] lg:w-[40rem] xl:w-[50rem]"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 -mt-4">
              Share your background, expertise, or what you're looking to
              practice. This helps others understand your experience level and
              areas of interest.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            {onPrev ? (
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                className="px-6 py-2.5 rounded-lg font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </Button>
            ) : (
              <div />
            )}

            <Button
              type="submit"
              className="px-8 py-2.5 rounded-lg font-medium bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 dark:from-violet-500 dark:to-purple-500 dark:hover:from-violet-600 dark:hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete Setup
            </Button>
          </div>
        </Cform>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-8 h-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default AvailabilityPreferences;
