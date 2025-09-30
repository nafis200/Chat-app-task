"use client";

import React from "react";
import PHform from "../form/PHform";
import { PdfUploader } from "../form/PdfUploader";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ResumeProps = {
  onNext: (data: any) => void;
  onPrev?: () => void;
  defaultValues?: any;
};

const resumeSchema = z.object({
  resume_url: z.array(z.any()).min(1, "At least one document is required"),
});

const ResumePortfolio = ({ onNext, onPrev, defaultValues }: ResumeProps) => {
  return (
    <PHform
      onSubmit={onNext}
      resolver={zodResolver(resumeSchema)}
      defaultValues={defaultValues}
    >
      <PdfUploader name="resume_url" />

      <div className="flex justify-between mt-2">
        {onPrev && <Button variant="secondary" onClick={onPrev}>Previous</Button>}
        <Button type="submit">Next</Button>
      </div>
    </PHform>
  );
};

export default ResumePortfolio;
