"use client";

import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "@/components/ui/label";

type PHPhoneInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: any;
  defaultCountry?: string;
};

export const PHPhoneInput = ({
  name,
  label,
  placeholder,
  disabled = false,
  icon: Icon,
  defaultCountry = "us",
}: PHPhoneInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full group">
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
            <div className="relative w-full">
              {/* Icon */}
              {Icon && (
                <Icon className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              )}

              {/* Phone Input */}
              <PhoneInput
                {...field}
                country={defaultCountry}
                value={field.value || ""}
                onChange={(value: any) => field.onChange(value)}
                disabled={disabled}
                disableCountryCode={false} 
                enableAreaCodes={true}
                inputProps={{
                  name,
                  placeholder: placeholder || label || name,
                  className: `w-full h-12 border-2 border-gray-200 rounded-lg pl-14 ml-2`,
                }}
              />
            </div>

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
