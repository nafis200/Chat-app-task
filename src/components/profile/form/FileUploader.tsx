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

type StoredFile = {
  file?: File;       // actual File object
  name: string;      // filename
  type: string;      // file type
  preview?: string;  // preview URL
};

export const FileUploader = ({
  name,
  label = "Upload Document",
  parentClassName = "",
}: DocUploaderProps) => {
  const { control } = useFormContext();

  const getFileIcon = (type: string) => {
    if (type === "application/pdf") return <AiFillFilePdf className="w-6 h-6 text-red-500" />;
    if (
      type === "application/msword" ||
      type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return <AiFillFileWord className="w-6 h-6 text-blue-500" />;
    if (type === "text/plain") return <AiFillFileText className="w-6 h-6 text-green-500" />;
    return <AiFillFileText className="w-6 h-6 text-gray-500" />;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const [storedFile, setStoredFile] = useState<StoredFile | null>(null);

        // Sync field.value with preview
        useEffect(() => {
          if (field.value && Array.isArray(field.value) && field.value[0]) {
            const val = field.value[0];
            if (val instanceof File) {
              const url = URL.createObjectURL(val);
              setStoredFile({ file: val, name: val.name, type: val.type, preview: url });

              return () => {
                URL.revokeObjectURL(url);
              };
            } else if (typeof val === "object" && val.name) {
              // Already stored format
              setStoredFile(val as StoredFile);
            }
          } else {
            setStoredFile(null);
          }
        }, [field.value]);

        const handleFileUpload = (files: File[]) => {
          if (files.length === 0) return;

          const file = files[0];
          const preview = URL.createObjectURL(file);
          const obj: StoredFile = { file, name: file.name, type: file.type, preview };
          setStoredFile(obj);
          field.onChange([obj]);
        };

        const removeFile = () => {
          if (storedFile?.preview) URL.revokeObjectURL(storedFile.preview);
          setStoredFile(null);
          field.onChange([]);
        };

        return (
          <div className={cn("flex flex-col gap-4", parentClassName)}>
            {label && <Label className="text-base font-medium justify-center">{label}</Label>}

            {storedFile ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between border rounded-lg p-2 bg-gray-50 dark:bg-gray-900">
                  <span className="flex items-center gap-2 truncate">
                    {getFileIcon(storedFile.type)}
                    {storedFile.name}
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

                {storedFile.type === "application/pdf" && storedFile.preview && (
                  <iframe
                    src={storedFile.preview}
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
