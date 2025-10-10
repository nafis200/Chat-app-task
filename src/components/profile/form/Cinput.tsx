"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type inputProps = {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  icon?: any;
  disabled?: boolean;
  readonly?: boolean;
  value?: string; 
  control?:any
};

export const Cinput = ({
  type = "text",
  name,
  placeholder,
  label,
  icon: Icon,
  disabled = false,
  readonly = false,
  value: parentValue,
  control // ✅ parent value
}: inputProps) => {
  

  return (
    <div className="flex flex-col w-full group">
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
            <div className="relative flex items-center w-full">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              )}

              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder || label || name}
                disabled={disabled}
                readOnly={readonly}
                value={parentValue !== undefined ? parentValue : field.value || ""} // ✅ use parent value if provided
                className={`w-full h-8 sm:h-12 md:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300
                  ${Icon ? "pl-10 sm:pl-11" : "px-3 sm:px-4"}
                `}
              />
            </div>

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
