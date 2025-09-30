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
      return <AiFillFilePdf className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />;
    if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <AiFillFileWord className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />;
    if (file.type === "text/plain")
      return <AiFillFileText className="w-6 h-6 sm:w-7 sm:h-7 text-green-500" />;
    return <AiFillFileText className="w-6 h-6 sm:w-7 sm:h-7 text-gray-500" />;
  };

  const getFileColor = (file: File) => {
    if (file.type === "application/pdf") return "from-red-500 to-pink-600";
    if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return "from-blue-500 to-indigo-600";
    if (file.type === "text/plain") return "from-green-500 to-emerald-600";
    return "from-gray-500 to-gray-600";
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // Prefill handle
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
          <div className={cn("flex flex-col gap-5 w-full", parentClassName)}>
            {label && (
              <Label className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {label}
              </Label>
            )}

            {/* Upload Area */}
            {!file && (
              <div
                className={cn(
                  "relative border-2 border-dashed rounded-xl transition-all duration-300 w-full sm:max-w-2xl mx-auto backdrop-blur-sm",
                  isDragging
                    ? "border-purple-500 bg-purple-50/50 dark:bg-purple-950/30 scale-105"
                    : "border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg"
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
                  className="flex flex-col items-center justify-center py-12 px-6 sm:py-16 sm:px-8 cursor-pointer"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 sm:mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                    Upload your file
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center font-medium">
                    PDF, DOC, TXT up to 5MB
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 text-center mt-2">
                    Drag and drop or click to browse
                  </p>
                </label>
              </div>
            )}

            {/* File Preview */}
            {file && (
              <div className="flex flex-col gap-4 w-full sm:max-w-2xl mx-auto">
                <div className="group relative flex items-center justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Gradient accent bar */}
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl bg-gradient-to-b", getFileColor(file))} />
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0 ml-2">
                    <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-md", getFileColor(file))}>
                      {getFileIcon(file)}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {(file.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={removeFile}
                    type="button"
                    className="ml-3 p-2.5 rounded-lg bg-white/90 hover:bg-white dark:bg-gray-700/90 dark:hover:bg-gray-700 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-300 shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-600"
                  >
                    <RiDeleteBinLine size={18} />
                  </Button>
                </div>

                {/* PDF Preview */}
                {file.type === "application/pdf" && (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-600" />
                    <iframe
                      src={URL.createObjectURL(file)}
                      className="w-full h-48 sm:h-60 md:h-72 lg:h-96"
                      title="PDF Preview"
                    />
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium mt-1 px-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
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