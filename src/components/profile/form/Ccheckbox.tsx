"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type TcheckboxProps = {
  name: string;
  label: string;
  disabled?: boolean;
};

export const Ccheckbox = ({ name, label, disabled = false }: TcheckboxProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Checkbox
              id={name}
              checked={field.value || false}
              onCheckedChange={(checked) => field.onChange(checked)}
              disabled={disabled}
              className="border-2 border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-colors"
            />

            <Label
              htmlFor={name}
              className="text-sm sm:text-base font-medium text-gray-700 dark:text-white"
            >
              {label}
            </Label>

            {error && (
              <small className="text-red-500 ml-2 text-xs sm:text-sm">
                {error.message}
              </small>
            )}
          </>
        )}
      />
    </div>
  );
};
