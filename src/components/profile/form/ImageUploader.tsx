"use client";

import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { RiDeleteBinLine } from "react-icons/ri";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type ImageUploaderProps = {
  name: string;
  label?: string;
  size?: "small" | "medium" | "large";
  parentClassName?: string;
};

const SIZE_CLASSES = {
  small: "w-24 h-24 sm:w-32 sm:h-32",
  medium: "w-32 h-32 sm:w-48 sm:h-48",
  large: "w-48 h-48 sm:w-64 sm:h-64",
};

const ImageUploader = ({
  name,
  label = "Upload Images",
  size = "medium",
  parentClassName = "",
}: ImageUploaderProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const [imagePreviews, setImagePreviews] = useState<string[]>([]);
        const [isDragging, setIsDragging] = useState(false);

        // Generate preview URLs
        useEffect(() => {
          const urls: string[] = [];

          if (field.value && field.value.length > 0) {
            field.value.forEach((file: File | string) => {
              if (file instanceof File) urls.push(URL.createObjectURL(file));
              else if (typeof file === "string") urls.push(file);
            });
          }

          setImagePreviews(urls);

          return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
          };
        }, [field.value]);

        const removeImage = (index: number) => {
          const newFiles = field.value.filter((_: any, i: number) => i !== index);
          field.onChange(newFiles);
        };

        const handleFiles = (files: FileList | null) => {
          if (!files) return;
          const fileArr = Array.from(files);
          field.onChange([...(field.value || []), ...fileArr]);
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        };

        const handleDragOver = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(false);
        };

        return (
          <div className={cn("flex flex-col gap-5 w-full", parentClassName)}>
            {label && <Label className="text-lg font-semibold text-gray-900 dark:text-gray-100">{label}</Label>}

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-1 justify-center">
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group flex-shrink-0 bg-white dark:bg-gray-800",
                      SIZE_CLASSES[size]
                    )}
                  >
                    <img src={src} alt={`Image ${index}`} className="object-cover w-full h-full" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      className="absolute top-2 right-2 p-2 rounded-lg bg-white/90 hover:bg-white text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-sm"
                      onClick={() => removeImage(index)}
                    >
                      <RiDeleteBinLine size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            <div
              className={cn(
                "relative border-2 border-dashed rounded-xl transition-all duration-300 w-full sm:max-w-2xl mx-auto backdrop-blur-sm",
                isDragging
                  ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 scale-105"
                  : "border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id={`file-upload-${name}`}
              />

              <label
                htmlFor={`file-upload-${name}`}
                className="flex flex-col items-center justify-center py-12 px-6 sm:py-16 sm:px-8 cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 sm:mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                </div>

                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  Upload your profile
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center font-medium">
                  PNG, JPG up to 3MB
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 text-center mt-2">
                  Drag and drop or click to browse
                </p>
              </label>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium mt-1 px-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error.message}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default ImageUploader;