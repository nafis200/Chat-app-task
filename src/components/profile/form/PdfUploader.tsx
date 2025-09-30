"use client";

import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { AiFillFilePdf, AiFillFileWord, AiFillFileText } from "react-icons/ai";

type DocUploaderProps = {
  name: string;
  label?: string;
  parentClassName?: string;
};

export const PdfUploader = ({
  name,
  label = "Upload Document",
  parentClassName = "",
}: DocUploaderProps) => {
  const { control } = useFormContext();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
        // prefill handle
        useEffect(() => {
          if (field.value && Array.isArray(field.value) && field.value[0]) {
            setFile(field.value[0]);
          }
        }, [field.value]);

        const handleFileUpload = (files: FileList | null) => {
          if (!files || files.length === 0) return;
          const selectedFile = files[0];
          setFile(selectedFile);
          field.onChange([selectedFile]); 
        };

        const removeFile = () => {
          setFile(null);
          field.onChange([]);
        };

        const handleDrop = (e: React.DragEvent) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileUpload(e.dataTransfer.files);
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
            {!file && (
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-2xl transition-all duration-200 dark:bg-black",
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
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileUpload(e.target.files)}
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
                    Upload your file
                  </h3>
                  <p className="text-sm text-gray-500">PDF, DOC, TXT up to 5MB</p>
                </label>
              </div>
            )}

            {/* File Preview */}
            {file && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border rounded-lg p-3 bg-gray-50 shadow-sm">
                  <span className="flex items-center gap-2 truncate">
                    {getFileIcon(file)}
                    {file.name}
                  </span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={removeFile}
                    type="button"
                  >
                    <RiDeleteBinLine size={16} />
                  </Button>
                </div>

                {/* PDF Preview */}
                {file.type === "application/pdf" && (
                  <iframe
                    src={URL.createObjectURL(file)}
                    className="w-full h-60 md:h-80 lg:h-96 border rounded-lg"
                    title="PDF Preview"
                  />
                )}
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
