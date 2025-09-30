"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PHtextareaProps = {
  name: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  rows?: number;
};

export const PHtextarea = ({
  name,
  placeholder,
  label,
  disabled = false,
  rows = 4,
}: PHtextareaProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full group lg:max-w-screen-lg max-w-sm md:max-w-screen-md"> 
      {/* Label */}
      {label && (
        <Label
          htmlFor={name}
          className="mb-1 sm:mb-2 ml-1 sm:ml-2 text-sm sm:text-base font-medium text-gray-700 dark:text-white"
        >
          {label}:
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            {/* Textarea */}
            <Textarea
              {...field}
              id={name}
              rows={rows}
              placeholder={placeholder || label || name}
              disabled={disabled}
              value={field.value || ""}
              className="w-full max-w-full sm:max-w-screen-md md:max-w-screen-lg mx-auto border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base resize-none"
            />

            {/* Error Message */}
            {error && (
              <small className="text-red-500 mt-1 sm:mt-2 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1 text-xs sm:text-sm">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {error.message}
              </small>
            )}
          </>
        )}
      />
    </div>
  );
};
