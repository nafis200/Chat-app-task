"use client";

import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiFillFilePdf, AiFillFileWord, AiFillFileText } from "react-icons/ai";
import { Upload } from "lucide-react"; // Upload icon
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type DocUploaderProps = {
  name: string;
  label?: string;
  parentClassName?: string;
  control: any;
};

export const PdfUploader = ({
  name,
  label = "Upload Document",
  parentClassName = "",
  control
}: DocUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const MAX_SIZE_MB = 5;

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf")
      return <AiFillFilePdf className="w-6 h-6 text-red-500" />;
    if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <AiFillFileWord className="w-6 h-6 text-blue-500" />;
    if (file.type === "text/plain")
      return <AiFillFileText className="w-6 h-6 text-green-500" />;
    return <AiFillFileText className="w-6 h-6 text-gray-500" />;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        useEffect(() => {
          if (field.value && Array.isArray(field.value) && field.value[0]) {
            setFile(field.value[0]);
          }
        }, [field.value]);

        const handleFileUpload = (files: FileList | null) => {
          if (!files || files.length === 0) return;
          const selectedFile = files[0];

          // Check file size
          if (selectedFile.size / 1024 / 1024 > MAX_SIZE_MB) {
            setLocalError(`File size should not exceed ${MAX_SIZE_MB} MB`);
            return;
          }

          setFile(selectedFile);
          setLocalError(null);
          field.onChange([selectedFile]);
        };

        const removeFile = () => {
          setFile(null);
          setLocalError(null);
          field.onChange([]);
        };

        return (
          <div className={cn("flex flex-col gap-3 w-full", parentClassName)}>
            {label && (
              <Label className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {label}
              </Label>
            )}

            {!file && (
              <label
                htmlFor={`file-upload-${name}`}
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 cursor-pointer hover:border-gray-400 transition-colors gap-2"
              >
                <Upload className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id={`file-upload-${name}`}
                />
                <span className="text-gray-600 dark:text-gray-400 text-sm text-center">
                  Click to upload or drag & drop (Max {MAX_SIZE_MB} MB)
                </span>
              </label>
            )}

            {file && (
              <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                  {getFileIcon(file)}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {file.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  type="button"
                  onClick={removeFile}
                >
                  <RiDeleteBinLine size={18} />
                </Button>
              </div>
            )}

            {(error || localError) && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                {localError || error?.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
