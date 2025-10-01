"use client";

import React from "react";

import ImageUploader from "../form/ImageUploader";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image as ImageIcon,
} from "lucide-react";
import Cform from "../form/CHform";

type ProfileImageProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const imageSchema = z.object({
  avatar_url: z.array(z.any()).min(1, "At least one image is required"),
});

const ProfileImageUpload = ({
  onNext,
  onPrev,
  defaultValues,
}: ProfileImageProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Profile Picture
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Upload a photo to personalize your profile
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
        <Cform
          onSubmit={onNext}
          resolver={zodResolver(imageSchema)}
          defaultValues={defaultValues}
        >
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upload Your Photo
              </h3>
            </div>

            {/* Image Uploader */}
            <div className="flex justify-center">
              <ImageUploader
                name="avatar_url"
                label="Upload Profile Image"
                size="medium"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
            {onPrev ? (
              <Button
                type="button"
                variant="outline"
                onClick={onPrev}
                className="px-6 py-2.5 rounded-lg font-medium transition-all hover:bg-gray-50"
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
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-8 h-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-500 dark:to-rose-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
