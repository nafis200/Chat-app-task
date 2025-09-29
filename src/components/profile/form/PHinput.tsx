"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PHinputProps = {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  icon?: any;
  disabled?: boolean;
};

export const PHinput = ({
  type = "text",
  name,
  placeholder,
  label,
  icon: Icon,
  disabled = false,
}: PHinputProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full group">
      {label && (
        <Label
          htmlFor={name}
          className="mb-2 ml-2 text-sm sm:text-base font-medium text-gray-700 dark:text-white"
        >
          {label}:
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative flex items-center">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              )}
              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder || label || name}
                disabled={disabled}
                className={`w-full h-12 sm:h-14 md:h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl text-sm sm:text-base
                  ${Icon ? "pl-11" : ""}
                `}
                value={field.value || ""}
              />
            </div>

            {error && (
              <small className="text-red-500 mt-2 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1 text-xs sm:text-sm">
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
