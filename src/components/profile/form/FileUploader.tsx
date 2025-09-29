"use client";

import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { AiFillFilePdf, AiFillFileWord, AiFillFileText } from "react-icons/ai";

type DocUploaderProps = {
  name: string;
  label?: string;
  parentClassName?: string;
};

export const FileUploader = ({
  name,
  label = "Upload Document",
  parentClassName = "",
}: DocUploaderProps) => {
  const { control } = useFormContext();

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") return <AiFillFilePdf className="w-6 h-6 text-red-500" />;
    if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <AiFillFileWord className="w-6 h-6 text-blue-500" />;
    if (file.type === "text/plain") return <AiFillFileText className="w-6 h-6 text-green-500" />;
    return <AiFillFileText className="w-6 h-6 text-gray-500" />;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const [file, setFile] = useState<File | null>(null);

        // Pre-fill existing value
        useEffect(() => {
          if (field.value && Array.isArray(field.value)) {
            setFile(field.value[0]);
          }
        }, [field.value]);

        const handleFileUpload = (files: File[]) => {
          if (files.length > 0) {
            const selectedFile = files[0];
            setFile(selectedFile);
            // Pass as array for Zod validation
            field.onChange([selectedFile]);
          }
        };

        const removeFile = () => {
          setFile(null);
          field.onChange([]); // empty array for Zod validation
        };

        return (
          <div className={cn("flex flex-col gap-4", parentClassName)}>
            {label && <Label className="text-base font-medium justify-center">{label}</Label>}

            {file ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 dark:bg-gray-900">
                  <span className="flex items-center gap-2 truncate">
                    {getFileIcon(file)}
                    {file.name}
                  </span>
                  <Button variant="destructive" size="sm" onClick={removeFile} type="button">
                    <RiDeleteBinLine size={16} />
                  </Button>
                </div>

                {file.type === "application/pdf" && (
                  <iframe
                    src={URL.createObjectURL(file)}
                    className="w-full h-60 md:h-80 lg:h-96 border rounded-lg"
                    title="PDF Preview"
                  />
                )}
              </div>
            ) : (
              <div className="w-full">
                <FileUpload onChange={handleFileUpload} name={name} />
              </div>
            )}

            {error && <small className="text-red-500 text-sm font-medium">{error.message}</small>}
          </div>
        );
      }}
    />
  );
};
