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
          <div className={cn("flex flex-col gap-4 w-full", parentClassName)}>
            {label && <Label className="text-base font-medium">{label}</Label>}

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2 justify-start">
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow group flex-shrink-0",
                      SIZE_CLASSES[size]
                    )}
                  >
                    <img src={src} alt={`Image ${index}`} className="object-cover w-full h-full" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-200" />

                    <Button
                      variant="destructive"
                      size="sm"
                      type="button"
                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-500 hover:bg-red-600 opacity-0 hover:opacity-100 transition-opacity shadow-lg"
                      onClick={() => removeImage(index)}
                    >
                      <RiDeleteBinLine size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            <div
              className={cn(
                "relative border-2 border-dashed rounded-2xl transition-all duration-200 w-full sm:max-w-lg mx-auto dark:bg-black",
                isDragging
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50/30"
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
                className="flex flex-col items-center justify-center py-10 px-4 sm:py-12 sm:px-6 cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 flex items-center justify-center mb-3 sm:mb-4">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" strokeWidth={2} />
                </div>

                <h3 className="text-md sm:text-lg font-semibold text-orange-500 mb-1">
                  Upload your profile
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 text-center">PNG, JPG up to 3MB</p>
              </label>
            </div>

            {error && (
              <small className="text-red-500 text-sm font-medium mt-1">
                {error.message}
              </small>
            )}
          </div>
        );
      }}
    />
  );
};

export default ImageUploader;
