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
  small: "w-32 h-32",
  medium: "w-48 h-48",
  large: "w-64 h-64",
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

        // Preview generate করা এবং clean-up
        useEffect(() => {
          const urls: string[] = [];

          if (field.value && field.value.length > 0) {
            field.value.forEach((file: File | string) => {
              if (file instanceof File) {
                const url = URL.createObjectURL(file);
                urls.push(url);
              } else if (typeof file === "string") {
                urls.push(file);
              }
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
          <div className={cn("flex flex-col gap-4", parentClassName)}>
            {label && <Label className="text-base font-medium">{label}</Label>}

            {/* Upload Area */}
            <div
              className={cn(
                "relative border-2 border-dashed rounded-2xl transition-all duration-200",
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
                className="flex flex-col items-center justify-center py-12 px-6 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-orange-500" strokeWidth={2} />
                </div>

                <h3 className="text-lg font-semibold text-orange-500 mb-1">
                  Upload your profile
                </h3>

                <p className="text-sm text-gray-500">PNG, JPG up to 3MB</p>
              </label>
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {imagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow group",
                      SIZE_CLASSES[size]
                    )}
                  >
                    <img
                      src={src}
                      alt={`Image ${index}`}
                      className="object-cover w-full h-full"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-200" />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 p-2 rounded-full bg-red-500 hover:bg-red-600 opacity-0 hover:opacity-100 transition-opacity duration-200 shadow-lg"
                      onClick={() => removeImage(index)}
                      type="button"
                    >
                      <RiDeleteBinLine size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <small className="text-red-500 text-sm font-medium">
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
