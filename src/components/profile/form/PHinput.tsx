
"use client";
import React, { useState } from "react";
import { useForm, FormProvider, Controller, FieldValues, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Circle, Mail, Lock, User, Phone, MapPin, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

// Form Components
export const PHinput = ({ type = "text", name, placeholder, icon: Icon }: any) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col w-full group">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="relative">
              {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              )}
              <Input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder || name}
                className={`w-full ${Icon ? 'pl-11' : ''} h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 rounded-xl`}
                value={field.value || ""}
              />
            </div>
            {error && (
              <small className="text-red-500 mt-2 ml-1 flex items-center gap-1 animate-in slide-in-from-top-1">
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