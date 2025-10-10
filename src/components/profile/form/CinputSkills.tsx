"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";

type inputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  icon?: any;
  disabled?: boolean;
  readonly?: boolean;
  control: any; // required
  value: string[]; // current skills array from parent
  setValue: (name: string, value: any, options?: any) => void; // parent setValue function
};

export const CinputSkills = ({
  name,
  label,
  placeholder,
  icon: Icon,
  disabled = false,
  readonly = false,
  control,
  value: skills,
  setValue
}: inputProps) => {
  const [inputValue, setInputValue] = useState("");

  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(inputValue.trim())) {
        setValue(name, [...skills, inputValue.trim()], { shouldValidate: true });
      }
      setInputValue("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setValue(name, updatedSkills, { shouldValidate: true });
  };

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

      {/* Skills display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
          >
            {skill}
            <X
              onClick={() => removeSkill(index)}
              className="w-3 h-3 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Input field */}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="relative flex items-center w-full">
            {Icon && (
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            )}

            <Input
              {...field}
              id={name}
              type="text"
              placeholder={placeholder || "Type a skill and press Enter"}
              disabled={disabled}
              readOnly={readonly}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full h-10 sm:h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300
                ${Icon ? "pl-10 sm:pl-11" : "px-3 sm:px-4"}
              `}
            />

            {error && (
              <small className="text-red-500 mt-1 sm:mt-2 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1 text-xs sm:text-sm">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                {error.message}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};
