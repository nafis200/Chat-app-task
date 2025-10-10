"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CRichTextEditor } from "../form/CRichTextEditor";

const availabilitySchema = z.object({
  is_available_for_mock_interviews: z.boolean(),
  description: z.string().min(10, "Description must be at least 10 characters long"),
});

type AvailabilityFormValues = z.infer<typeof availabilitySchema>;

const AvailabilityPreferences = () => {
  const methods = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilitySchema),
    mode: "all",
    defaultValues: {
      is_available_for_mock_interviews: false,
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    control,
    register,
    watch,
    setValue,
  } = methods;

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit: SubmitHandler<AvailabilityFormValues> = (data) => {
    console.log("Submitted availability data:", data);
  };

  return (
    <div className="w-full mx-auto p-6">
    
      {/* ✅ Form Grid */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* ✅ Error Summary */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">
          Availability & Preferences
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          In this section, you can set your availability and other preferences.
        </p>
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 p-4 rounded-md space-y-1 mb-4  dark:bg-red-900/20">
              <h3 className="font-semibold mb-2">Please fix the following:</h3>
              <ul className="list-disc list-inside text-sm">
                {Object.entries(errors).map(([key, value]: any) => (
                  <li key={key}>{value?.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ✅ Form Section */}
        <div className="w-full lg:w-2/3">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Available for Mock Interviews */}
              <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
                <Label className="text-base font-medium">
                  Available for mock interviews
                </Label>
                <Switch
                  {...register("is_available_for_mock_interviews")}
                  checked={watch("is_available_for_mock_interviews")}
                  onCheckedChange={(value) =>
                    setValue("is_available_for_mock_interviews", value)
                  }
                />
              </div>

              {/* Description */}
              <div>
                <Label className="text-base font-medium mb-2 block ml-5">
                  Description
                </Label>
                <CRichTextEditor
                  control={control}
                  name="description"
                  placeholder="Write about yourself..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <Button type="submit" className="px-6">
                  Save Preferences
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPreferences;
