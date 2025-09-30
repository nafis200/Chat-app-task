"use client";

import React from "react";
import PHform from "../form/PHform";
import { PHcheckbox } from "../form/PHcheckbox";
import { PHRichTextEditor } from "../form/PHRichTextEditor";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type AvailabilityProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const availabilitySchema = z.object({
  is_available_for_mock_interviews: z.boolean(),
  description: z.string().optional(),
});

const AvailabilityPreferences = ({ onNext, onPrev, defaultValues }: AvailabilityProps) => {
  return (
    <PHform
      onSubmit={onNext}
      resolver={zodResolver(availabilitySchema)}
      defaultValues={defaultValues}
    >
      <PHcheckbox name="is_available_for_mock_interviews" label="Available for mock interviews" />
      <PHRichTextEditor name="description" label="Description" />

      <div className="flex justify-between mt-2">
        {onPrev && <Button variant="secondary" onClick={onPrev}>Previous</Button>}
        <Button type="submit">Finish</Button>
      </div>
    </PHform>
  );
};

export default AvailabilityPreferences;
