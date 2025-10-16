"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Cinput } from "../form/Cinput";
import { Button } from "@/components/ui/button";
import ImageUploader from "../form/ImageUploader";

const accountSchema = z
  .object({
    avatar_url: z
      .any()
      .refine((file) => file instanceof File || typeof file === "string", {
        message: "Profile image is required",
      }),
    email: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type AccountFormValues = z.infer<typeof accountSchema>;

const SecurityAccount = () => {
  const methods = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    mode: "all",
    defaultValues: {
      avatar_url: [],
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    trigger,
    control,
  } = methods;

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit: SubmitHandler<AccountFormValues> = (data) => {
    console.log("Submitted account data:", data);
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Error Summary */}

        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Security & Account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Update your account credentials and profile picture
          </p>
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 p-4 rounded-md space-y-1 mb-4">
              <h3 className="font-semibold">Please fix the following:</h3>
              <ul className="list-disc list-inside text-sm">
                {Object.entries(errors).map(([key, value]: any) => (
                  <li key={key}>{value?.message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-2/3">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture */}
              <div>
                <label className="text-sm font-medium">
                  Profile Picture (Avatar)*
                </label>
                <div className="mt-2 rounded-xl p-6 text-center">
                  <ImageUploader control={control} name="avatar_url" />
                </div>
              </div>

              {/* Email */}
              <div>
                <Cinput
                  control={control}
                  name="email"
                  type="email"
                  label="Email*"
                  placeholder="Enter your email"
                  value="abc@gmail.com"
                  readonly={true}
                />
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <Cinput
                  control={control}
                  name="password"
                  type="password"
                  label="Password*"
                  placeholder="Enter password"
                />
                <Cinput
                  control={control}
                  name="confirm_password"
                  type="password"
                  label="Confirm Password*"
                  placeholder="Re-enter password"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" className="px-6">
                  Save
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default SecurityAccount;





  