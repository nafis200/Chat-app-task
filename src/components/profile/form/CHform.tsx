"use client";
import React, { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  SubmitHandler,
} from "react-hook-form";

type TFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
};

const Cform = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {
  const methods = useForm({ defaultValues, resolver });


  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
};

export default Cform;
