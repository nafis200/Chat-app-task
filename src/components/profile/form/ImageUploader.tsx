"use client";

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  name: string;
  control: any;
  label?: string;
};

const ImageUploader = ({
  name,
  control,
  label = "Change avatar",
}: ImageUploaderProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const [preview, setPreview] = useState<string | null>(null);

        useEffect(() => {
          if (field.value instanceof File) {
            const url = URL.createObjectURL(field.value);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
          } else if (typeof field.value === "string") {
            setPreview(field.value);
          } else {
            setPreview(null);
          }
        }, [field.value]);

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) field.onChange(file);
        };

        return (
          <div className="flex flex-col items-center gap-2">
            {/* Avatar Circle */}
            <div
              className={cn(
                "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-start justify-start text-white text-2xl font-bold bg-teal-800 overflow-hidden"
              )}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            <div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full px-4 py-1 text-sm"
                >
                  {label}
                </Button>
                <p className="text-xs text-gray-500 mt-1 text-center">
                JPG, PNG, or GIF. Max 2 MB. Files over 150KB will be compressed.
              </p>
              </div>
              
            </div>
          </div>
        );
      }}
    />
  );
};

export default ImageUploader;
