"use client";

import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
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
        useEffect(() => {
          if (field.value && field.value.length > 0 && imagePreviews.length === 0) {
            const previews = field.value.map((file: File | string) =>
              typeof file === "string" ? file : URL.createObjectURL(file)
            );
            setImagePreviews(previews);
          }
        }, []);

        const removeImage = (index: number) => {
          const newFiles = field.value.filter((_: any, i: number) => i !== index);
          setImagePreviews((prev) => prev.filter((_, i) => i !== index));
          field.onChange(newFiles);
        };

        return (
          <div className={cn("flex flex-col gap-2", parentClassName)}>
            <Label>{label}</Label>

            <div className="flex flex-wrap gap-4">
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  className={cn("relative rounded-xl overflow-hidden", SIZE_CLASSES[size])}
                >
                  <Image src={src} alt={`Image ${index}`} fill className="object-cover" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-60 hover:bg-red-600 transition-colors"
                    onClick={() => removeImage(index)}
                  >
                    <RiDeleteBinLine size={20} />
                  </Button>
                </div>
              ))}
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  const fileArr = Array.from(files);
                  setImagePreviews((prev) => [
                    ...prev,
                    ...fileArr.map((f) => URL.createObjectURL(f)),
                  ]);
                  field.onChange([...(field.value || []), ...fileArr]);
                }
              }}
              className="block w-full rounded-lg border border-gray-300 p-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 file:text-white file:cursor-pointer hover:file:bg-blue-600 transition-all"
            />

            {error && <small className="text-red-500">{error.message}</small>}
          </div>
        );
      }}
    />
  );
};

export default ImageUploader;
