"use client";

import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type InputProps = {
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
  setValue,
}: InputProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (!skills.includes(newSkill)) {
        setValue(name, [...skills, newSkill], { shouldValidate: true });
      }
      setInputValue("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setValue(name, updatedSkills, { shouldValidate: true });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [skills]);

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
            <div className="relative flex flex-wrap items-center gap-2 border-2 border-gray-200 rounded-lg sm:rounded-xl w-full h-auto min-h-[2rem] p-1 focus-within:border-blue-500 truncate">
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

              {/* Actual input */}
              <Input
                {...field}
                id={name}
                type="text"
                placeholder={
                  skills.length === 0
                    ? placeholder || "Type a skill and press Enter"
                    : ""
                }
                disabled={disabled}
                readOnly={readonly}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className="flex-1 w-full border-none shadow-none focus:ring-0 h-8 sm:h-10 text-sm sm:text-base px-1 py-1"
              />
            </div>
            <div>
              {error && (
                <small className="w-full text-red-500 mt-1 sm:mt-2 flex items-center gap-1 text-xs sm:text-sm">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                  {error.message}
                </small>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
};
