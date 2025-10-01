"use client";

import React from "react";

import { PdfUploader } from "../form/PdfUploader";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText,CheckCircle2, Sparkles, Shield } from "lucide-react";
import Cform from "../form/CHform";

type ResumeProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const resumeSchema = z.object({
  resume_url: z.array(z.any()).min(1, "At least one document is required"),
});

const ResumePortfolio = ({ onNext, onPrev, defaultValues }: ResumeProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Resume & Portfolio
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Upload your resume or portfolio to showcase your experience
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
        <Cform
          onSubmit={onNext}
          resolver={zodResolver(resumeSchema)}
          defaultValues={defaultValues}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950 flex items-center justify-center">
                <FileText className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upload Your Document
              </h3>
            </div>

            <div className="flex justify-center">
              <PdfUploader name="resume_url" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    PDF Format
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Accepts PDF files only
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Up to 10MB
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Maximum file size
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Secure Upload
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Your data is protected
                  </p>
                </div>
              </div>
            </div>
          </div>

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
              className="px-8 py-2.5 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 text-white  shadow-lg hover:shadow-xl transition-all"
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
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-8 h-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default ResumePortfolio;
