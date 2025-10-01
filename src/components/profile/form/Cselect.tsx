"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = {
  value: string;
  label: string;
};

type selectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
};

export const Cselect = ({
  name,
  label,
  placeholder = "Select an option",
  options,
  disabled = false,
}: selectProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full">
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
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <SelectTrigger className="w-full h-12 p-[22px] sm:h-12 md:h-32 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl text-sm sm:text-base">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {error && (
              <small className="text-red-500 mt-2 ml-1 text-xs sm:text-sm">
                {error.message}
              </small>
            )}
          </>
        )}
      />
    </div>
  );
};
