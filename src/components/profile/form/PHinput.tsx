"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input"; 

type PHinputProps = {
  type?: string;
  name: string;
  placeholder?: string;
};

const PHinput = ({ type = "text", name, placeholder }: PHinputProps) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder || name}
              className="w-full"
              value={field.value || ""}
            />
            {error && (
              <small className="text-red-500 mt-1">{error.message}</small>
            )}
          </>
        )}
      />
    </div>
  );
};

export default PHinput;
